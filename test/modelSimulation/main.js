const initialiseTest = require('./initialise.js');
const runTest = require('./run.js');

const modelSimulationTest = () => {
  initialiseTest();
  runTest();
}

module.exports = modelSimulationTest;
