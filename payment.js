'use strict';

const paymentStrategy = require('payment-strategy');

module.exports.createPayment = function() {
  let strategies = {};

  class Payment {
    use(strategy) {
      console.log('getPrototypeOf', Object.getPrototypeOf(strategy) === new paymentStrategy);
    }
  }

  return new Payment();
};