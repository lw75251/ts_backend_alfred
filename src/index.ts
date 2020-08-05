
import * as dotenv from 'dotenv';
import express = require('express');
import bodyParser = require('body-parser');
import jwt from 'jsonwebtoken';


// Routes
import * as userRoutes from '../src/users/user.routes';
import * as loginRoutes from '../src/users/login.routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

app.use('/login', loginRoutes.router);
app.use('/user', userRoutes.router);


app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
