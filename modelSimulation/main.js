'use strict';
const initialise = require('./initialise.js');
const run = require('./run.js');

const modelSimulation = {
  'initialise': async(initConditions, virusSeverity, testMode = false) => {
    const results = await initialise(initConditions, virusSeverity, testMode);
    return results
  },
  'run': async(startTime, stopTime) => {
    const results = await run(startTime, stopTime);
    return results
  }
}

module.exports = modelSimulation;
