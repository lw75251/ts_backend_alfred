/**
 * LoggerOptions for {Logger} class
 * @field {string} tag: The shorten message contained in brackets []
 * @field {any} log: The value to be printed
 */
interface LoggerOptions {
    tag: String;
    log: any;
}
/**
 * Logger class built upon chalk that assigns a color to the type of
 * log statement. All logs have a [tag] associated to them and are as follows:
 * Error -> Red
 * Value -> Blue
 * Green -> Status
 */
declare class Logger {
    /**
     * Prints the error statement in red
     * @param {LoggerOptions} options: Contains the tag and value of log statement
     */
    errorLog(options: LoggerOptions): void;
    /**
     * Prints the value in blue
     * @param {LoggerOptions} options: Contains the tag and value of log statement
     */
    printLog(options: LoggerOptions): void;
    /**
     * Prints the error statement in red
     * @param {LoggerOptions} options: Contains the tag and value of log statement
     */
    statusLog(options: LoggerOptions): void;
}
declare const logger: Logger;
export { logger, LoggerOptions };
