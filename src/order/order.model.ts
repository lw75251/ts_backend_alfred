import {BinaryLike} from 'crypto';
import crypto from 'crypto';

/**
 * Order Options
 * @property {string} orderId: Unique Order Id
 * @property {string} restaurantId: Restaurant Id order goes to
 * @property {userId} userId: User Id who initiated order
 * @property {Date} timestamp: Epochtime of when order was submitted
 * @property {[Object]} items: Array of items ordered
 * @property {Number} orderTotal: Items total (Does not include tax or tip)
 * @property {Number} tax
 * @property {Number} tip
 * @property {Date | undefined} completedTimestamp: Order completion epochtime
 * @property {boolean | undefined} completed: Flag if order is complete
 */
interface OrderOptions {
  orderId?: string;
  restaurantId: string;
  userId: string;
  timestamp: Date;
  items: [Object];
  orderTotal: Number;
  tax: Number;
  tip: Number;
  completedTimestamp?: Date;
  completed?: boolean;
}

/**
 * Order Class
 * A user's order at a restaurant that contains items ordered and
 * restaurant order status information
 */
class Order {
  orderId: string | undefined;
  restaurantId: string;
  userId: string;
  timestamp: Date;
  items: [Object];
  orderTotal: Number;
  tax: Number;
  tip: Number;
  completedTimestamp: Date | undefined;
  completed: boolean;

  /** Order Constructor based off of OrderOptions
   * @param {OrderOptions} orderOptions: Order fields
   */
  constructor(orderOptions: OrderOptions) {
    this.orderId = orderOptions.orderId;
    this.restaurantId = orderOptions.restaurantId;
    this.userId = orderOptions.userId;
    this.timestamp = orderOptions.timestamp;
    this.items = orderOptions.items;
    this.orderTotal = orderOptions.orderTotal;
    this.tax = orderOptions.tax;
    this.tip = orderOptions.tip;
    this.completedTimestamp = orderOptions.completedTimestamp;
    this.completed = orderOptions.completed ?? false;
  }

  /**
   * Maps an Order Object to store in Firestore
   * @return {object} object with all of a user's fields
   */
  toFirestoreJson(): object {
    return {
      orderId: this.orderId,
      restaurantId: this.restaurantId,
      userId: this.userId,
      timestamp: this.timestamp,
      items: this.items,
      orderTotal: this.orderTotal,
      tax: this.tax,
      tip: this.tip,
      completedTimestamp: this.completedTimestamp,
      completed: this.completed,
    };
  }

  /**
   * Maps an Order Object to return to user
   * @return {object} object fields to return to user
   */
  toJson(): object {
    return {
      orderId: this.orderId,
      restaurantId: this.restaurantId,
      userId: this.userId,
      timestamp: this.timestamp,
      items: this.items,
      orderTotal: this.orderTotal,
      tax: this.tax,
      tip: this.tip,
      completedTimestamp: this.completedTimestamp,
      completed: this.completed,
    };
  }
}

export {Order, OrderOptions};
