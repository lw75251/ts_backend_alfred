"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = exports.updateFirebaseUser = exports.addFirebaseUser = void 0;
const firebase_1 = require("../../config/firebase");
const chalk_1 = require("../../config/chalk");
/**
 * Adds a user to the Firebase Auth (can be managed online)
 * @param {User} user: Contains the fields for User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function addFirebaseUser(user) {
    try {
        const userRecord = await firebase_1.auth.createUser(user.toFirestoreJson());
        // See the UserRecord reference doc for the contents of userRecord.
        chalk_1.logger.printLog({ tag: 'Created User', log: userRecord.uid });
        return userRecord.uid;
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Create User', log: err });
        throw err;
    }
}
exports.addFirebaseUser = addFirebaseUser;
;
/**
 * Updates a user in the Firebase Auth (can be managed online)
 * @param {string} uid: Unique ID of User
 * @param {UserOptions} userOptions: User to be updated
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function updateFirebaseUser(uid, userOptions) {
    try {
        const userRecord = await firebase_1.auth
            .updateUser(uid, userOptions);
        // See the UserRecord reference doc for the contents of userRecord.
        chalk_1.logger.printLog({ tag: 'Updated User', log: userRecord });
        return userRecord.uid;
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Update User', log: err });
        throw err;
    }
}
exports.updateFirebaseUser = updateFirebaseUser;
;
/**
 * Creates an auth token from Firebase Auth
 * @param {string} userId: Unique ID of User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function createToken(userId) {
    try {
        const customToken = await firebase_1.auth.createCustomToken(userId);
        return customToken;
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Custom Token', log: err });
        throw err;
    }
}
exports.createToken = createToken;
;
/**
 * Verifies auth token created from Firebase Auth
 * @param {string} idToken: Unique ID of User
 * @return {Promise<string>} uid: Returns the Firebase Auth User ID
 */
async function verifyToken(idToken) {
    try {
        const decodedToken = await firebase_1.auth.verifyIdToken(idToken);
        return decodedToken.uid;
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Verify Token', log: err });
        throw err;
    }
}
exports.verifyToken = verifyToken;
;
//# sourceMappingURL=auth.js.map