import express from 'express';
import {User} from './user.model';
import {logger} from '../../config/chalk';
import * as firestore from '../firebase/dao';
import * as auth from '../firebase/auth';
import {Firestore} from '@google-cloud/firestore';

/**
 * Retrieves user from Firestore
 * @param {express.Request} req : Express Request
 * @param {express.Response} res : Express Response
 */
async function getUser(
  req: express.Request,
  res: express.Response
) {

};

/**
 * Adds new user to Firebase Auth and creates a document for user in Firestore
 * @param {User} user : Express Request
 * @return {object | undefined} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function createUser(user: User) {
  try {
    user.id = await auth.addFirebaseUser(user);
    const docId = await firestore.addToCollection('users', user);
    return {
      docId: docId,
      data: user.toJson(),
    };
  } catch (error) {
    logger.errorLog({tag: 'Create User', log: error});
    return undefined;
  }
};

export {getUser, createUser};
