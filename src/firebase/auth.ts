import {auth} from '../../config/firebase';
import {User, UserOptions} from '../users/user.model.js';
import {logger} from '../../config/chalk';

/**
 * Adds a user to the Firebase Auth (can be managed online)
 * @param {User} user: Contains the fields for User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function addFirebaseUser(user: User): Promise<string> {
  try {
    const userRecord = await auth.createUser(user.toFirestoreJson());
    // See the UserRecord reference doc for the contents of userRecord.
    logger.printLog({tag: 'Created User', log: userRecord.uid});
    return userRecord.uid;
  } catch (err) {
    logger.errorLog({tag: 'Create User', log: err});
    throw err;
  }
};

/**
 * Updates a user in the Firebase Auth (can be managed online)
 * @param {string} uid: Unique ID of User
 * @param {UserOptions} userOptions: User to be updated
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function updateFirebaseUser(
  uid: string,
  userOptions: UserOptions
): Promise<string | Error> {
  try {
    const userRecord = await auth
      .updateUser(uid, userOptions);
    // See the UserRecord reference doc for the contents of userRecord.
    logger.printLog({tag: 'Updated User', log: userRecord});
    return userRecord.uid;
  } catch (err) {
    logger.errorLog({tag: 'Update User', log: err});
    throw err;
  }
};

/**
 * Creates an auth token from Firebase Auth
 * @param {string} userId: Unique ID of User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function createToken(userId: string): Promise<string> {
  try {
    const customToken = await auth.createCustomToken(userId);
    return customToken;
  } catch (err) {
    logger.errorLog({tag: 'Custom Token', log: err});
    throw err;
  }
};

/**
 * Verifies auth token created from Firebase Auth
 * @param {string} idToken: Unique ID of User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function verifyToken(idToken: string): Promise<string> {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (err) {
    logger.errorLog({tag: 'Verify Token', log: err});
    throw err;
  }
};

export {addFirebaseUser, updateFirebaseUser, createToken, verifyToken};
