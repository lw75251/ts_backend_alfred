import { User } from './user.model';
/**
 * Validates password using 'SHA512' and user's salt
 * @param {User} user : User to authenticate password
 * @return {boolean} true if hashed password matches user hash
 */
declare function validPassword(user: User): boolean;
/**
 * Fetches a user's data from firestore based on user email
 * @param {string} email: user email to query search for
 */
declare function getUserByEmail(email: string): Promise<User>;
/**
 * Fetches a users' data from firestore based on user uid
 * @param {string} userId : Document Id of User
 * @return {Promise<User>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
declare function getUserByUid(userId: string): Promise<User>;
/**
 * Adds new user to Firebase Auth and creates a document for user in Firestore
 * @param {User} user : Express Request
 * @return {Promise<object>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
declare function createUser(user: User): Promise<object>;
export { validPassword, getUserByEmail, getUserByUid, createUser };
