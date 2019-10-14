const resourceDeploymentTests = require('./resourceDeploymentTestCase.js');
const donationTests = require('./donationCases/main.js');
const testMultipleOrders = require('./multipleOrders.js')

module.exports = () => {
  describe('10 countries setup', function() {
    donationTests();
    resourceDeploymentTests();
    testMultipleOrders();
  });
}
