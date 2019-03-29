const initialiseTest = require('./initialise/main.js');
const runTest = require('./run/main.js');

const modelSimulationTest = () => {
  initialiseTest();
  runTest();
}

module.exports = modelSimulationTest;
