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
/**
 * Alfred User Class
 */
declare class User {
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
    constructor(userOptions: UserOptions);
    /**
     * Maps a User Object to Firestore JSON
     * @return {object} object with all of a user's fields
     */
    toFirestoreJson(): object;
    /**
     * Maps a User Object to Firestore JSON
     * @return {object} object with all of a user's fields
     */
    toJson(): object;
}
export { User, UserOptions };
