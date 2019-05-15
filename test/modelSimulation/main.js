const infrastructure = require('./infrastructure/main.js')
const initialiseTest = require('./initialise/main.js');
const runTest = require('./run/main.js');


const modelSimulationTest = () => {
  infrastructure();
  initialiseTest();
  runTest();
}

module.exports = modelSimulationTest;
