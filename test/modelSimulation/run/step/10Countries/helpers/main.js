'use strict';

const fs = require('fs');
const model = require('../../../../../../modelSimulation/main.js');
const csvReader = require('csvtojson');

const initModel = (mode, manualValues = null) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const dirPath = './R_Models/games/game_1/model/data/';
      const policyMatrixPath = `${dirPath}PolicyMatrix.csv`;
      const donationsPath = `${dirPath}donations.csv`;
      const countriesTemplate = `${dirPath}CountriesTemplate.csv`;
      let initialisationResult;
      const virusSeverity = 0;

      if(fs.existsSync(policyMatrixPath)) {
        fs.unlinkSync(policyMatrixPath)
      }

      if(fs.existsSync(donationsPath)) {
        fs.unlinkSync(donationsPath)
      }

      const initConditions = await csvReader().fromFile(countriesTemplate);
      const teams = initConditions.map(rowTeam => {return rowTeam.Name});

      if(mode === 'manual') {
        const countrySetupTemplate = `${dirPath}country_MOCK_UP_TEMPLATE.csv`;
        const countrySetup = await csvReader().fromFile(countrySetupTemplate);

        if(manualValues) {
          manualValues.forEach(paramObj => {
            countrySetup.forEach(row => {
              if(row.Name == paramObj.team) {
                row[paramObj.var] = paramObj.value;
              }
            });
          })
        }

        initialisationResult = await model.initialise(initConditions,
          virusSeverity, true, true, countrySetup);
      }

      if(mode === 'default') {
        initialisationResult = await model.initialise(initConditions,
          virusSeverity, true);
      }
      resolve({
        'initialisationResult': initialisationResult,
        'teams': teams
      });
    } catch(err){
    reject(err)
    }
  });
  return promise;
}

module.exports = initModel;
