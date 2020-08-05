import express = require('express');
import {User} from '../users/user.model';
import {logger, LoggerOptions} from '../../config/chalk';
import * as userController from '../users/user.controller';
import jwt from 'jsonwebtoken';

// import userController = require('./user.controller');

const router = express();

/**
 * User Login POST Endpoint
 * Route: '/login'
 */
router.post('/', async function(req: express.Request, res: express.Response) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const verifyUser = await userController.getUserByEmail(email);
    verifyUser.password = password;
    if (userController.validPassword(verifyUser)) {
      const accessToken = jwt.sign(
        verifyUser.toJson(),
        process.env.ACCESS_TOKEN_SECRET as string
      );
      res.status(201).send({message: 'Fetched User', body: accessToken});
    } else {
      throw Error('Invalid Email/Password Combination');
    };
  } catch (err) {
    logger.errorLog({tag: 'Login', log: err.message});
    res.status(500).send({error: err.message});
  }
});


export {router};
