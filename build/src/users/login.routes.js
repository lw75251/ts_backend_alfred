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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const chalk_1 = require("../../config/chalk");
const userController = __importStar(require("../users/user.controller"));
// import userController = require('./user.controller');
const router = express();
exports.router = router;
/**
 * User Login POST Endpoint
 * Route: '/login'
 */
router.post('/', async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const verifyUser = await userController.getUserByEmail(email);
        verifyUser.password = password;
        if (userController.validPassword(verifyUser)) {
            console.log('passowrd true');
        }
        else {
            console.log('password false');
        }
        ;
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Login', log: err.message });
    }
});
//# sourceMappingURL=login.routes.js.map