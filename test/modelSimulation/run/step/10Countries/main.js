const assert = require('chai').assert;
const model = require('../../../../../modelSimulation/main.js');
const csvReader = require('csvtojson');
const fs = require('fs');
const resourceDeploymentTests = require('./resourceDeploymentTestCase.js');
const nonNegativeTests = require("../../commonTests/nonNegativeStocks.js");
const basicTests = require("../../commonTests/basic.js");
const donationTests = require('./donationCases/main.js');

describe('10 countries setup', function() {
  donationTests();
  resourceDeploymentTests();
});
