'use strict';
const singleCountry = require('./singleCountry.js');
const tenCountries = require('./10Countries/main.js')

module.exports = () => {
  describe('run a simulation step', () => {
    tenCountries();
    singleCountry();
  });
}
