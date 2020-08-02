require('dotenv').config();

import express = require('express');
import bodyParser = require('body-parser');
// import bcrypt = require('bcrypt');

// Firebase
// const firestore = require('../../config/firebase.js').db;

// Routes
// const userRoutes = require('../src/users/user.routes').router;
import * as userRoutes from '../src/users/user.routes';

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use('/user', userRoutes.router);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
