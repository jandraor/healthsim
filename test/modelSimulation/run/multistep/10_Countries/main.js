'use strict';

const basicScenario = require('./basic.js');
const orders = require('./orders/main.js');
const equalConditions = require('./equalConditions.js');


const tests = () => {
  describe('10 countries', () => {
    basicScenario();
    equalConditions();
    orders();
  })
}

module.exports = tests;
