require('dotenv').config();

import express = require('express');
import bodyParser = require('body-parser');
// import bcrypt = require('bcrypt');

// Firebase
const firestore = require('../../config/firebase.js').db;

// Routes
import userRoutes = require('./domain/users/user.routes');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
