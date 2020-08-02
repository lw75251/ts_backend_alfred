import express from 'express';
import {User} from './user.model';
import {logger} from '../../config/chalk';
import * as firestore from '../firebase/dao';
import * as auth from '../firebase/auth';
import {Firestore} from '@google-cloud/firestore';
import crypto from 'crypto';

/**
 * Validates password using 'SHA512' and user's salt
 * @param {User} user : Express Request
 * @return {object | undefined} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function validPassword(user: User) {
  const hash = crypto
    .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
    .toString('hex');
  return user.hash === hash;
}

/**
 * Creates a hashed SHA-512 Password using User Password and Salt
 * @param {User} user : Express Request
 */
function setPassword(user: User) {
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hash = crypto
    .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
    .toString('hex');
}

/**
 * Adds new user to Firebase Auth and creates a document for user in Firestore
 * @param {User} user : Express Request
 * @return {object | undefined} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function createUser(user: User) {
  try {
    user.id = await auth.addFirebaseUser(user);
    setPassword(user);
    const docId = await firestore.addToCollection(
      'users',
      user.toFirestoreJson()
    );
    return {
      docId: docId,
      data: user.toJson(),
    };
  } catch (error) {
    logger.errorLog({tag: 'Create User', log: error});
    return undefined;
  }
}

export {createUser};
