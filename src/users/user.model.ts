import {BinaryLike} from 'crypto';
import crypto from 'crypto';

interface UserOptions {
  id?: string;
  salt?: string;
  hash?: string;
  brainTreeId?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phoneNumber: string;
  history?: [];
}
/** Generates a random 256 byte Crypto Salt
 * @return {BinaryLike} buf:  random generated salt
 */
function generateSalt(): string {
  return crypto.randomBytes(256).toString('base64');
}

// TODO: Implement Generate Hash
/** User Constructor based off of UserOptions
 * @param {string | undefined} password: options a user can have
 * @return {string} Hashed Password
 */
function generateHash(password: string | undefined) {
  return '';
}

/**
 * Alfred User Class
 */
class User {
  id: string | undefined;
  salt: string;
  hash: string;
  brainTreeId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  password: string;
  phoneNumber: string;
  history: [] | undefined;

  /** User Constructor based off of UserOptions
   * @param {UserOptions} userOptions: options a user can have
   */
  constructor(userOptions: UserOptions) {
    this.id = userOptions.id;
    this.salt = userOptions.salt ?? generateSalt();
    this.hash = userOptions.hash ?? generateHash(userOptions.password);
    this.brainTreeId = userOptions.brainTreeId;
    this.firstName = userOptions.firstName;
    this.lastName = userOptions.lastName;
    this.email = userOptions.email;
    this.password = userOptions.password;
    this.phoneNumber = userOptions.phoneNumber;
    this.history = userOptions.history ?? [];
  }

  /**
   * Maps a User Object to Firestore JSON
   * @return {object} object with all of a user's fields
   */
  toFirestoreJson(): object {
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
  toJson(): object {
    return {
      id: this.id,
      brainTreeId: this.brainTreeId,
    };
  }
}

export {User, UserOptions};
