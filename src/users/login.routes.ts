import express = require('express');
import {User} from '../users/user.model';
import {logger, LoggerOptions} from '../../config/chalk';
import * as userController from '../users/user.controller';

// import userController = require('./user.controller');

const router = express();

/**
 * User Login POST Endpoint
 * Route: '/login'
 */
router.post('/', async function (req: express.Request, res: express.Response) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const verifyUser = await userController.getUserByEmail(email);
    verifyUser.password = password;
    if (userController.validPassword(verifyUser)) {
      console.log('passowrd true');
    } else {
      console.log('password false');
    }
  } catch (err) {
    logger.errorLog({tag: 'Login', log: err.message});
  }
});

export {router};
