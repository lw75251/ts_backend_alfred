import express from 'express';
import {User, UserOptions} from './user.model';
import {logger} from '../../config/chalk';
import * as firestore from '../firebase/dao';
import {QueryOperators} from '../firebase/dao';
import * as auth from '../firebase/auth';
import {Firestore} from '@google-cloud/firestore';
import crypto from 'crypto';

/**
 * Validates password using 'SHA512' and user's salt
 * @param {User} user : User to authenticate password
 * @return {boolean} true if hashed password matches user hash
 */
function validPassword(user: User): boolean {
  const hash = crypto
    .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
    .toString('hex');
  return user.hash === hash;
}

/**
 * Creates a hashed SHA-512 Password using User Password and Salt
 * @param {User} user : User to set password
 */
function setPassword(user: User) {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto
    .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
    .toString('hex');
}

/**
 * Fetches a user's data from firestore based on user email
 * @param {string} email: user email to query search for
 */
async function getUserByEmail(email: string) {
  try {
    const snapshot = await firestore.queryInCollection(
      'users',
      'email',
      QueryOperators.Equal,
      email
    );

    if (snapshot.empty) {
      throw Error('No user exists with specified email');
    }

    const userData = snapshot.docs[0].data();
    return new User(userData as UserOptions);
  } catch (err) {
    throw err;
  }
}

/**
 * Fetches a users' data from firestore based on user uid
 * @param {string} userId : Document Id of User
 * @return {Promise<User>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function getUserByUid(userId: string): Promise<User> {
  try {
    const userData = await firestore.getDocument('users', userId);
    const user = new User(userData as UserOptions);
    logger.printLog({tag: 'Get User', log: user});
    return user;
  } catch (err) {
    logger.errorLog({tag: 'Get User', log: err.message});
    throw err;
  }
}

/**
 * Adds new user to Firebase Auth and creates a document for user in Firestore
 * @param {User} user : Express Request
 * @return {Promise<object>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function createUser(user: User): Promise<object> {
  try {
    user.id = await auth.addFirebaseUser(user);
    setPassword(user);

    if (user.id === undefined) {
      throw Error(`UserId was undefined`);
    }

    const docId = await firestore.addToDocument(
      'users',
      user.id as string,
      user.toFirestoreJson()
    );
    return {
      docId: docId,
      data: user.toJson(),
    };
  } catch (err) {
    logger.errorLog({tag: 'Create User', log: err.message});
    throw err;
  }
}

export {validPassword, getUserByEmail, getUserByUid, createUser};
