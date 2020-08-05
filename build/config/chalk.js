"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
/**
 * Logger class built upon chalk that assigns a color to the type of
 * log statement. All logs have a [tag] associated to them and are as follows:
 * Error -> Red
 * Value -> Blue
 * Green -> Status
 */
class Logger {
    /**
     * Prints the error statement in red
     * @param {LoggerOptions} options: Contains the tag and value of log statement
     */
    errorLog(options) {
        console.error(chalk_1.default.red.bold(`[${options.tag}]: ${JSON.stringify(options.log, null, 4)}`));
    }
    /**
     * Prints the value in blue
     * @param {LoggerOptions} options: Contains the tag and value of log statement
     */
    printLog(options) {
        console.log(chalk_1.default.blue(`[${options.tag}]: ${JSON.stringify(options.log, null, 4)}`));
    }
    /**
     * Prints the error statement in red
     * @param {LoggerOptions} options: Contains the tag and value of log statement
     */
    statusLog(options) {
        console.log(chalk_1.default.green(`[${options.tag}]: ${options.log}`));
    }
}
const logger = new Logger();
exports.logger = logger;
//# sourceMappingURL=chalk.js.map