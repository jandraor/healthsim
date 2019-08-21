'use strict';
const initialise = require('./initialise.js');
const run = require('./run.js');
const getBaseRun = require('./base_run.js')

const modelSimulation = {
  'initialise': async(initConditions, virusSeverity,
    testMode = false, manualSetup = false, countrySetup) => {
    const results = await initialise(initConditions, virusSeverity, testMode,
      manualSetup, countrySetup);
    return results
  },
  'run': async(startTime, stopTime, policyMatrix, donations) => {
    const results = await run(startTime, stopTime, policyMatrix, donations);
    return results
  },
  'baseRun': async stopTime => {
    const results = await getBaseRun(stopTime)
    return results
  }
}

module.exports = modelSimulation;
