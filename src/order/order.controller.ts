import express from 'express';
import {Order, OrderOptions} from './order.model';
import {logger} from '../../config/chalk';
import * as firestore from '../firebase/dao';
import {QueryOperators} from '../firebase/dao';
import * as auth from '../firebase/auth';
import crypto from 'crypto';

/**
 * CompletedOrder contains the fields that need to be updated
 * when an order is completed. It contains properties that exist
 * in the Order Model
 *
 * @property {Date} completedTimestamp: Order completion epochtime
 * @property {boolean} completed: Flag if order is complete
 */
interface CompletedOrder {
  completed: boolean;
  completedTimestamp: Date;
}

/**
 * Fetches a users' data from firestore based on user uid
 * @param {string} orderId : Document Id of User
 * @param {object} completeData:
 * @return {Promise<User>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 *
 * ? Consider checking if previously completed and throwing error if so
 */
async function completeOrder(orderId: string): Promise<void> {
  try {
    firestore.addToDocument('orders', orderId, {
      completed: true,
      completedTimestamp: Date.now(),
    });
  } catch (err) {
    logger.errorLog({tag: 'Complete Order', log: err.message});
    throw err;
  }
}

/**
 * Fetches an Order from Firestore based on order id
 * @param {string} orderId : Document Id of User
 * @return {Promise<Order>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function getOrderByUid(orderId: string): Promise<Order> {
  try {
    const orderData = await firestore.getDocument('orders', orderId);
    const order = new Order(orderData as OrderOptions);
    logger.printLog({tag: 'Get Order', log: order});
    return order;
  } catch (err) {
    logger.errorLog({tag: 'Get Order', log: err.message});
    throw err;
  }
}

/**
 * Generates a document for new order. Adds order to history in User
 * @param {User} user : Express Request
 * @return {Promise<object>} Promise for Firebase Document Id of
 * newly generated user or undefined if failed to add
 */
async function createOrder(order: Order): Promise<object> {
  try {
    const docId = await firestore.addToCollection(
      'orders',
      order.toFirestoreJson()
    );
    return {
      docId: docId,
      data: order.toFirestoreJson(),
    };
  } catch (err) {
    logger.errorLog({tag: 'Create Order', log: err.message});
    throw err;
  }
}

export {completeOrder, getOrderByUid, createOrder};
