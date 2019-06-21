'use strict';
const tenCountries = require('./10_Countries/main.js')

module.exports = () => {
  describe('run multisteps', () => {
    tenCountries();
  });
}
