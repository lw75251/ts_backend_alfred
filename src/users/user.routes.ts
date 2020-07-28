import express = require('express');
import {User} from './user.model';
import {logger, LoggerOptions} from '../../config/chalk';
import * as userController from './user.controller';

// import userController = require('./user.controller');

const router = express.Router();

// / NOTE: Following Routes are appended to /user
// router.get('/', userController.getUser);

/**
 * Create New User POST Endpoint
 * Route: '/user'
 */
router.post('/', async function(
  req: express.Request,
  res: express.Response
) {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  });
  logger.printLog({tag: 'createUser', log: newUser});

  try {
    userController.createUser(newUser);
  } catch (err) {
    logger.errorLog({tag: 'Create User', log: err});
  }
});


module.exports = router;
