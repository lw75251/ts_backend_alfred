import express = require('express');
import {Order} from './order.model';
import {logger} from '../../config/chalk';
import * as orderController from './order.controller';

// import userController = require('./user.controller');

const router = express();

// / NOTE: Following Routes are appended to /user
/**
 * Gets a user's data
 * Route: '/user'
 */
router.get('/:orderId', async function (
  req: express.Request,
  res: express.Response
) {});

/**
 * Create New Order POST Endpoint
 * Route: '/order'
 */
router.post('/', async function (req: express.Request, res: express.Response) {
  const order = new Order({
    restaurantId: req.body.restaurantId,
    userId: req.body.userId,
    timestamp: req.body.timestamp,
    items: req.body.items,
    orderTotal: req.body.orderTotal,
    tax: req.body.tax,
    tip: req.body.tip,
    completedTimestamp: req.body.completedTimestamp,
    completed: req.body.completed,
  });
  try {
    const orderData = await orderController.createOrder(order);
    res.status(201).send({message: 'Created Order', body: orderData});
  } catch (err) {
    logger.errorLog({tag: 'Create Order', log: err});
    res.status(500).send({error: err.message});
  }
});

export {router};
