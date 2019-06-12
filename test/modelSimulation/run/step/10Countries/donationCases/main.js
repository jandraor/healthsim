
const defaultInit = require('./defaultInit.js');
const manualInit = require('./manualInit.js');

const test = () => {
  describe('donations', () => {
    defaultInit();
    manualInit();
  });
}

module.exports = test;
