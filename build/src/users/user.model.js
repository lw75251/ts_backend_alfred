"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
/** Generates a random 256 byte Crypto Salt
 * @return {BinaryLike} buf:  random generated salt
 */
function generateSalt() {
    return crypto_1.default.randomBytes(256).toString('base64');
}
// TODO: Implement Generate Hash
/** User Constructor based off of UserOptions
 * @param {string | undefined} password: options a user can have
 * @return {string} Hashed Password
 */
function generateHash(password) {
    return '';
}
/**
 * Alfred User Class
 */
class User {
    /** User Constructor based off of UserOptions
     * @param {UserOptions} userOptions: options a user can have
     */
    constructor(userOptions) {
        var _a, _b, _c;
        this.id = userOptions.id;
        this.salt = (_a = userOptions.salt) !== null && _a !== void 0 ? _a : generateSalt();
        this.hash = (_b = userOptions.hash) !== null && _b !== void 0 ? _b : generateHash(userOptions.password);
        this.brainTreeId = userOptions.brainTreeId;
        this.firstName = userOptions.firstName;
        this.lastName = userOptions.lastName;
        this.email = userOptions.email;
        this.password = userOptions.password;
        this.phoneNumber = userOptions.phoneNumber;
        this.history = (_c = userOptions.history) !== null && _c !== void 0 ? _c : [];
    }
    /**
     * Maps a User Object to Firestore JSON
     * @return {object} object with all of a user's fields
     */
    toFirestoreJson() {
        return {
            id: this.id,
            salt: this.salt,
            hash: this.hash,
            // brainTreeId: this.brainTreeId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            history: this.history,
        };
    }
    /**
     * Maps a User Object to Firestore JSON
     * @return {object} object with all of a user's fields
     */
    toJson() {
        return {
            id: this.id,
            brainTreeId: this.brainTreeId,
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map