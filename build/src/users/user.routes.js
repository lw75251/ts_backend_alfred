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
const user_model_1 = require("./user.model");
const chalk_1 = require("../../config/chalk");
const userController = __importStar(require("./user.controller"));
// import userController = require('./user.controller');
const router = express();
exports.router = router;
// / NOTE: Following Routes are appended to /user
/**
 * Gets a user's data
 * Route: '/user'
 */
router.get('/:userId', async function (req, res) {
    try {
        const user = await userController.getUserByUid(req.params.userId);
        chalk_1.logger.printLog({ tag: 'Fetch User', log: user });
        res.status(201).send({ message: 'Fetched User', body: user.toJson() });
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Fetch User', log: err.message });
        res.status(400).send({ error: err.message });
    }
});
/**
 * Create New User POST Endpoint
 * Route: '/user'
 */
router.post('/', async function (req, res) {
    const newUser = new user_model_1.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
    });
    try {
        const userData = await userController.createUser(newUser);
        res.status(201).send({ message: 'Created User', body: userData });
    }
    catch (err) {
        chalk_1.logger.errorLog({ tag: 'Create User', log: err });
        res.status(500).send({ error: err.message });
    }
});
//# sourceMappingURL=user.routes.js.map