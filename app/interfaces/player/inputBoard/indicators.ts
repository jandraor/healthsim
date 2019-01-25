const $ = require('jquery');

import * as objectQueries from '../objectQueries.ts';

export const updateStocks = params => {
  const sectionObject = objectQueries.getSectionObject('Resources');
  const team = $('#lTeamId').text();
  sectionObject.variables.forEach(variable => {
    const variableName = `${team}${variable.RName}`;
    const stockValue = Math.floor(params[variableName]);
    const prefix = variable.id.substring(0,3);
    $(`#lStock${prefix}`).text(Math.floor(stockValue));
    //Indicator in donations modal
    $(`#lblInv${prefix}`).text(Math.floor(stockValue));
  })
}
