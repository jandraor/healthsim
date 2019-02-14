const $ = require('jquery');
import * as ut from '../../../../helpers/utilities.ts';
import * as objectQueries from '../../objectQueries.ts';

export const applyInfoDelay = (variableId, section, simulationResult) => {
  const team = $('#lTeamId').text();
  const yVariable = objectQueries.getRVariables(variableId, section, team);
  const dataset = ut.create2DDataset('time', yVariable, simulationResult);
  const isDelayed = objectQueries.isDelayed(variableId, section);

  if(isDelayed){
    const informationDelay = $('#lIncome').data('reportingDelay');
    const currentRound = parseInt($('#lCurrentRound').text());
    const upperLimit = currentRound - informationDelay;
    const delayedDataset = dataset.filter(row => {return row.x <= upperLimit});
    return delayedDataset;
  }
  return dataset;
}
