'use strict';

const single_orders = require('./single_orders.js');
const multiple_orders = require('./multiple_orders.js')

const test = () => {
  describe(`orders`, () => {
    single_orders();
    multiple_orders();
  })
}

module.exports = test;
