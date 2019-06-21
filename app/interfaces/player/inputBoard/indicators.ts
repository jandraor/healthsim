const $ = require('jquery');
import * as objectQueries from '../objectQueries.ts';
import * as ut from '../../../helpers/utilities.ts';

export const updateStocks = params => {
  const sectionObject = objectQueries.getSectionObject('Resources');
  const team = $('#lTeamId').text();
  sectionObject.variables.forEach(variable => {
    const variableName = `${team}${variable.RName}`;
    const stockValue = Math.floor(params[variableName]);
    const prefix = variable.id.substring(0,3);
    let stockAvailable;

    if(variable.id === 'Financial'){
      stockAvailable = stockValue;
    }

    if(variable.id != 'Financial') {
      const lcVar = variable.id.toLowerCase();
      const spoilageRate = $('#lTeamId').data('spoilageRates')[lcVar];
      stockAvailable = Math.floor(ut.findDepletingConst(stockValue,
        spoilageRate, 1))
    }

    $(`#lStock${prefix}`).text(Math.floor(stockAvailable));
    //Indicator in donations modal
    $(`#lblInv${prefix}`).text(Math.floor(stockAvailable));
    $(`#lRemaining${prefix}`).text(Math.floor(stockAvailable));
  })
}
