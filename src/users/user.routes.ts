import express = require('express');
import {User} from './user.model';
import {logger, LoggerOptions} from '../../config/chalk';
import * as userController from './user.controller';

// import userController = require('./user.controller');

const router = express();

// / NOTE: Following Routes are appended to /user
/**
 * Gets a user's data
 * Route: '/user'
 */
router.get('/:userId', async function(
  req: express.Request,
  res: express.Response
) {
  try {
    const user = await userController.getUserByUid(req.params.userId);
    logger.printLog({tag: 'Fetch User', log: user});
    res.status(201).send({message: 'Fetched User', body: user.toJson()});
  } catch (err) {
    logger.errorLog({tag: 'Fetch User', log: err.message});
    res.status(400).send({error: err.message});
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
    const userData = await userController.createUser(newUser);
    res.status(201).send({message: 'Created User', body: userData});
  } catch (err) {
    logger.errorLog({tag: 'Create User', log: err});
    res.status(500).send({error: err.message});
  }
});

export {router};
