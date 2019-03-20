'use strict';
const initialise = require('./initialise.js');

const modelSimulation = {
  'initialise': async(initConditions, virusSeverity, testMode = false) => {
    const results = await initialise(initConditions, virusSeverity, testMode);
    return results
  },
  'runModel': () => {
    console.log('run model');
  }
}

module.exports = modelSimulation;
