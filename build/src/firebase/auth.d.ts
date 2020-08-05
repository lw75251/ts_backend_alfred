import { User, UserOptions } from '../users/user.model.js';
/**
 * Adds a user to the Firebase Auth (can be managed online)
 * @param {User} user: Contains the fields for User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
declare function addFirebaseUser(user: User): Promise<string>;
/**
 * Updates a user in the Firebase Auth (can be managed online)
 * @param {string} uid: Unique ID of User
 * @param {UserOptions} userOptions: User to be updated
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
declare function updateFirebaseUser(uid: string, userOptions: UserOptions): Promise<string | Error>;
/**
 * Creates an auth token from Firebase Auth
 * @param {string} userId: Unique ID of User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
declare function createToken(userId: string): Promise<string>;
/**
 * Verifies auth token created from Firebase Auth
 * @param {string} idToken: Unique ID of User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
declare function verifyToken(idToken: string): Promise<string>;
export { addFirebaseUser, updateFirebaseUser, createToken, verifyToken };
