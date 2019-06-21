const stepTestSuite = require('./step/main.js');
const multiStepTestSuite = require('./multistep/main.js');

module.exports = () => {
  stepTestSuite();
  multiStepTestSuite();
}
