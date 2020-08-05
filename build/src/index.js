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
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
// import bcrypt = require('bcrypt');
// Firebase
// const firestore = require('../../config/firebase.js').db;
// Routes
// const userRoutes = require('../src/users/user.routes').router;
const userRoutes = __importStar(require("../src/users/user.routes"));
const loginRoutes = __importStar(require("../src/users/login.routes"));
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use('/login', loginRoutes.router);
app.use('/user', userRoutes.router);
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});
//# sourceMappingURL=index.js.map