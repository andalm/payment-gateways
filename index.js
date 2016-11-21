'use strict';

const payment = require('./lib/payment').createPayment();
const paymentStrategy = require('payment-strategy');

payment.use(new paymentStrategy('fuck'));
payment.registerCreditCard('fuck', {});