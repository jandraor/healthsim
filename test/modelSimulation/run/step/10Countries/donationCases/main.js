const defaultInit = require('./defaultInit.js');
const manualInit = require('./manualInit.js');
const donateAll = require('./donateAll.js')

const test = () => {
  describe('donations', () => {
    defaultInit();
    manualInit();
    donateAll();
  });
}

module.exports = test;
