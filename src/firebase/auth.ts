import {auth} from '../../config/firebase';
import {User, UserOptions} from '../users/user.model.js';
import {logger} from '../../config/chalk';

/**
 * Adds a user to the Firebase Auth (can be managed online)
 * @param {User} user: Contains the fields for User
 * @return {Promise<string | undefined>} uid: Returns the Firebase Auth User ID
 */
async function addFirebaseUser(user: User): Promise<string | undefined> {
  try {
    const userRecord = await auth.createUser(user.toJson());
    // See the UserRecord reference doc for the contents of userRecord.
    logger.printLog({tag: 'Created User', log: userRecord.uid});
    return userRecord.uid;
  } catch (error) {
    logger.errorLog({tag: 'Create User', log: error});
    return undefined;
  }
};

/**
 * Updates a user in the Firebase Auth (can be managed online)
 * @param {string} uid: Unique ID of User
 * @param {UserOptions} userOptions: User to be updated
 * @return {Promise<string | undefined>} uid: Returns the Firebase Auth User ID
 */
async function updateFirebaseUser(
  uid: string,
  userOptions: UserOptions
): Promise<string | undefined> {
  try {
    const userRecord = await auth
      .updateUser(uid, userOptions);
    // See the UserRecord reference doc for the contents of userRecord.
    logger.printLog({tag: 'Updated User', log: userRecord});
    return userRecord.uid;
  } catch (error) {
    logger.errorLog({tag: 'Update User', log: error});
    return undefined;
  }
};

/**
 * Creates an auth token from Firebase Auth
 * @param {string} userId: Unique ID of User
 * @return {Promise<string | undefined>} uid: Returns the Firebase Auth User ID
 */
async function createToken(userId: string): Promise<string | undefined> {
  try {
    const customToken = await auth.createCustomToken(userId);
    return customToken;
  } catch (error) {
    logger.errorLog({tag: 'Custom Token', log: error});
    return undefined;
  }
};

/**
 * Verifies auth token created from Firebase Auth
 * @param {string} idToken: Unique ID of User
 * @return {Promise<string | undefined>} uid: Returns the Firebase Auth User ID
 */
async function verifyToken(idToken: string): Promise<string | undefined> {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    logger.errorLog({tag: 'Verify Token', log: error});
    return undefined;
  }
};

export {addFirebaseUser, updateFirebaseUser, createToken, verifyToken};
