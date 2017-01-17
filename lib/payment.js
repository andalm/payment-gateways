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
      if (strategies[strategy.name]) {
        throw Error('The strategy had already been registered.');
      }
      strategies[strategy.name] = strategy;
    }

    getStrategiesName() {
      return Object.keys(strategies);
    }

    registerCreditCard(provider, params, cb) {
      this._validateProviderName(provider);
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      strategies[provider].registerCreditCard.call(strategies[provider], params, cb);
    }

    deleteCreditCard(provider, params, cb) {
      this._validateProviderName(provider);
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      strategies[provider].deleteCreditCard.call(strategies[provider], params, cb);
    }

    verifyCreditCard(provider, params, cb) {
      this._validateProviderName(provider);
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      strategies[provider].verifyCreditCard.call(strategies[provider], params, cb);
    }

    pay(provider, params, cb) {
      this._validateProviderName(provider);
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      strategies[provider].pay.call(strategies[provider], params, cb);
    }

    refund(provider, params, cb) {
      this._validateProviderName(provider);
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      strategies[provider].refund.call(strategies[provider], params, cb);
    }

    query(provider, params, cb) {
      this._validateProviderName(provider);
      if (typeof params == 'function') {
        cb = params;
        params = {};
      }
      if (typeof cb != 'function') {
        cb = noop;
      }
      strategies[provider].query.call(strategies[provider], params, cb);
    }

    _validateProviderName(provider) {
      if (typeof provider != 'string') {
        throw Error(`The first parameter must be a string.`);
      }

      if (!strategies[provider]) {
        throw Error(`Provider ${provider} doesn't registered yet.`);
      }
    }
  }

  return new Payment();
};