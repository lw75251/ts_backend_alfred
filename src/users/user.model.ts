interface UserOptions {
  id?: string,
  brainTreeId?: string,
  firstName?: string,
  lastName?: string,
  email: string,
  password: string,
  phoneNumber: string,
  history?:[],
}

/**
 * Alfred User Class
 */
class User {
    id: string | undefined;
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
      this.brainTreeId = userOptions.brainTreeId;
      this.firstName = userOptions.firstName;
      this.lastName = userOptions.lastName;
      this.email = userOptions.email;
      this.password = userOptions.password;
      this.phoneNumber = userOptions.phoneNumber;
      this.history = userOptions.history ?? [];
    }

    /**
     * Maps a User Object to JSON
     * @return {UserOptions} object with all of a user's fields
     */
    toJson(): UserOptions {
      return {
        id: this.id,
        brainTreeId: this.brainTreeId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        history: this.history,
      };
    }
}

export {User, UserOptions};
