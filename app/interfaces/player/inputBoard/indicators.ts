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
