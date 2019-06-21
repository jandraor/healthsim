const resourceDeploymentTests = require('./resourceDeploymentTestCase.js');
const donationTests = require('./donationCases/main.js');

module.exports = () => {
  describe('10 countries setup', function() {
    donationTests();
    resourceDeploymentTests();
  });
}
