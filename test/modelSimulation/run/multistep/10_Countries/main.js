'use strict';

const basicScenario = require('./basic.js');
const orders = require('./orders/main.js');


const tests = () => {
  describe('10 countries', () => {
    basicScenario();
    orders();
  })
}

module.exports = tests;
