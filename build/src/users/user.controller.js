"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByUid = exports.getUserByEmail = exports.validPassword = void 0;
const user_model_1 = require("./user.model");
const chalk_1 = require("../../config/chalk");
const firestore = __importStar(require("../firebase/dao"));
const dao_1 = require("../firebase/dao");
const auth = __importStar(require("../firebase/auth"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Validates password using 'SHA512' and user's salt
 * @param {User} user : User to authenticate password
 * @return {boolean} true if hashed password matches user hash
 */
function validPassword(user) {
    const hash = crypto_1.default
        .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
        .toString('hex');
    return user.hash === hash;
}
exports.validPassword = validPassword;
/**
 * Creates a hashed SHA-512 Password using User Password and Salt
 * @param {User} user : User to set password
 */
function setPassword(user) {
    user.salt = crypto_1.default.randomBytes(16).toString('hex');
    user.hash = crypto_1.default
        .pbkdf2Sync(user.password, user.salt, 10000, 512, 'sha512')
        .toString('hex');
}
/**
 * Fetches a user's data from firestore based on user email
 * @param {string} email: user email to query search for
 */
async function getUserByEmail(email) {
    try {
        const snapshot = await firestore.queryInCollection('users', 'email', dao_1.QueryOperators.Equal, email);
        if (snapshot.empty) {
            throw Error('No user exists with specified email');
        }
        const userData = snapshot.docs[0].data();
        return new user_model_1.User(userData);
    }
    catch (err) {
        throw err;
    }
}
exports.getUserByEmail = getUserByEmail;
/**
 * Fetches a users' data from firestore based on user uid
 * @param {string} userId : Document Id of User
 * @return {Promise<User>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function getUserByUid(userId) {
    try {
        const userData = await firestore.getDocument('users', userId);
        const user = new user_model_1.User(userData);
        chalk_1.logger.printLog({ tag: 'Get User', log: user });
        return user;
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Get User', log: err.message });
        throw err;
    }
}
exports.getUserByUid = getUserByUid;
/**
 * Adds new user to Firebase Auth and creates a document for user in Firestore
 * @param {User} user : Express Request
 * @return {Promise<object>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function createUser(user) {
    try {
        user.id = await auth.addFirebaseUser(user);
        setPassword(user);
        if (user.id === undefined) {
            throw Error(`UserId was undefined`);
        }
        const docId = await firestore.addToDocument('users', user.id, user.toFirestoreJson());
        return {
            docId: docId,
            data: user.toJson(),
        };
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Create User', log: err.message });
        throw err;
    }
}
exports.createUser = createUser;
//# sourceMappingURL=user.controller.js.map