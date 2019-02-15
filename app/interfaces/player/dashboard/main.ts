import * as timeseries from './timeseries.ts';
import * as selects from './selects.ts';
import * as sparklines from './sparklines.ts';
import * as arcMeters from './arcMeters.ts';
import * as ut from '../../../helpers/utilities.ts';
const $ = require('jquery');

export const build = initParams => {
  $('#lIncome').data('reportingDelay', Math.round(initParams.reportingDelay));
  const stopTime = initParams.rounds;
  timeseries.buildCharts(stopTime);
  selects.build();
  sparklines.build(initParams);
  arcMeters.build();
}

export const update = newData => {
  const currentData = $('#lTeamId').data('data');

  let results;

  if($.isEmptyObject(currentData)) {
    $('#lTeamId').data('data', newData);
    results = newData;
  }

  if(!$.isEmptyObject(currentData)) {
    newData.shift();
    const updatedData = ut.bindData(currentData, newData);
    console.table(updatedData);
    $('#lTeamId').data('data', updatedData);
    results = updatedData;
  }

  sparklines.draw(results);
  timeseries.drawAll(results);
}

export const newRound = () => {
  const currentValue = parseInt($('#lCurrentRound').text());
  $('#lCurrentRound').text(currentValue + 1);
}
