'use strict';

const paymentStrategy = require('payment-strategy');
const noop = () => {};

module.exports.createPayment = function() {
  let strategies = {};

  class Payment {
    use(strategy) {
      if (!(strategy instanceof paymentStrategy)) {
        throw Error('Strategy passed as a param must be inherited payment-strategy.');
      }
      if (!strategy.name) {
        throw Error('Strategy must have a name.');
      }
      if (strategies[strategy.name]) {
        throw Error('The strategy had already been registered.');
      }
      strategies[strategy.name] = strategy;
    }

    registerCreditCard(provider, params, cb) {
      this._verifyParams(provider, params, cb);
      strategies[provider].registerCreditCard.call(this, params, cb);
    }

    deleteCreditCard(provider, params, cb) {
      this._verifyParams(provider, params, cb);
      strategies[provider].deleteCreditCard.call(this, params, cb);
    }

    verifyCreditCard(provider, params, cb) {
      this._verifyParams(provider, params, cb);
      strategies[provider].verifyCreditCard.call(this, params, cb);
    }

    pay(provider, params, cb) {
      this._verifyParams(provider, params, cb);
      strategies[provider].pay.call(this, params, cb);
    }

    refund(provider, params, cb) {
      this._verifyParams(provider, params, cb);
      strategies[provider].refund.call(this, params, cb);
    }

    query(provider, params, cb) {
      this._verifyParams(provider, params, cb);
      strategies[provider].query.call(this, params, cb);
    }

    _verifyParams(provider, params, cb) {
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      if (!strategies[provider]) {
        throw Error(`Provider ${provider} doesn't registered yet.`);
      }
    }
  }

  return new Payment();
};