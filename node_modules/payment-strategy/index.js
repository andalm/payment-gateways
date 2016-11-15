'use strict';

module.exports = class PaymentStrategy {
  registerCreditCard() {
    throw Error('registerCreditCard isn\'t implement yet.');
  }

  deleteCreditCard() {
    throw Error('deleteCreditCard isn\'t implement yet.');
  }

  verifyCreditCard() {
    throw Error('deleteCreditCard isn\'t implement yet.');
  }

  pay() {
    throw Error('deleteCreditCard isn\'t implement yet.');
  }

  refund() {
    throw Error('deleteCreditCard isn\'t implement yet.');
  }

  query() {
    throw Error('deleteCreditCard isn\'t implement yet.');
  }
};