const $ = require('jquery');
import * as objectQueries from '../objectQueries.ts';
import * as ut from '../../../helpers/utilities.ts';

export const updateStocks = params => {
  const sectionObject = objectQueries.getSectionObject('Resources');
  const team = $('#lTeamId').text();
  sectionObject.variables.forEach(variable => {
    const variableName = `${team}${variable.RName}`;
    const stockValue = params[variableName];
    const prefix = variable.id.substring(0,3);
    let stockAvailable;

    if(variable.id === 'Financial'){
      stockAvailable = Math.floor(stockValue);
    }

    if(variable.id != 'Financial') {
      const lcVar = variable.id.toLowerCase();
      const spoilageRate = $('#lTeamId').data('spoilageRates')[lcVar];
      //0.997 is used to offset Euler integration error & to avoid negative numbers
      stockAvailable = Math.floor(ut.findDepletingConst(stockValue,
        spoilageRate, 1) * 0.997)
    }

    $(`#lStock${prefix}`).text(stockAvailable);
    //Indicator in donations modal
    $(`#lblInv${prefix}`).text(stockAvailable);
    $(`#lRemaining${prefix}`).text(stockAvailable);
  })
}

export const updateResourcesOnTransit = lastRow => {
  const supplyLineArray = [
    {
      'resource': 'Antivirals',
      'supplyLineVar': '_AVR_AVSL'
    },
    {
      'resource': 'Vaccines',
      'supplyLineVar': '_VAC_VSL'
    },
    {
      'resource': 'Ventilators',
      'supplyLineVar': '_VEN_VSL'
    }
  ];

  const team = $('#lTeamId').text();

  supplyLineArray.forEach(slObj => {
    const variableName = `${team}${slObj.supplyLineVar}`;
    const prefix =  slObj.resource.substring(0,3);
    const value = Math.round(lastRow[variableName]);
    $(`#lInTransit${prefix}`).text(value);
  });
}
