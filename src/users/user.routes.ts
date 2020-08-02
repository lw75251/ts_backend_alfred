import express = require('express');
import {User} from './user.model';
import {logger, LoggerOptions} from '../../config/chalk';
import * as userController from './user.controller';

// import userController = require('./user.controller');

const router = express();

// / NOTE: Following Routes are appended to /user
// router.get('/', userController.getUser);

/**
 * Create New User POST Endpoint
 * Route: '/user'
 */
router.get('/', async function(req: express.Request, res: express.Response) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    hash: undefined,
  });
  logger.printLog({tag: 'Fetch User', log: user});

  try {
    // userController.getUser(newUser);
  } catch (err) {
    logger.errorLog({tag: 'Create User', log: err});
  }
});

/**
 * Create New User POST Endpoint
 * Route: '/user'
 */
router.post('/', async function(req: express.Request, res: express.Response) {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    userController.createUser(newUser);
  } catch (err) {
    logger.errorLog({tag: 'Create User', log: err});
  }
});

export {router};
