'use strict';
const initialise = require('./initialise.js');

const modelSimulation = {
  'initialise': async(initConditions, virusSeverity) => {
    const results = await initialise(initConditions, virusSeverity);
    return results
  },
  'runModel': () => {
    console.log('run model');
  }
}

module.exports = modelSimulation;
