'use strict';

const p = require('./payment').createPayment();
const paymentStrategy = require('payment-strategy');

p.use(new paymentStrategy);