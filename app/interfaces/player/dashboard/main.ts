import * as timeseries from './timeseries.ts';
import * as selects from './selects.ts';
import * as sparklines from './sparklines.ts';
import * as arcMeters from './arcMeters.ts';
import * as ut from '../../../helpers/utilities.ts';
import * as bullet from './bullet.ts';
import * as sf from './stocks&flows.ts';
import * as map from './map.ts';
const $ = require('jquery');

export const build = initParams => {
  $('#lTeamId').data('spoilageRates', initParams.spoilageRates);
  $('#lIncome').data('reportingDelay', Math.round(initParams.reportingDelay));
  $('#lPopulation').data('value', initParams.population)
  const stopTime = initParams.rounds;
  timeseries.buildCharts(stopTime);
  selects.build();
  sparklines.build(initParams);
  arcMeters.build(initParams);
  sf.build(initParams);
  map.build(initParams);
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
    $('#lTeamId').data('data', updatedData);
    results = updatedData;
  }

  sparklines.draw(results);
  timeseries.drawAll(results);
  arcMeters.update(results);
  sf.update(results);
}

export const newRound = () => {
  const currentValue = parseInt($('#lCurrentRound').text());
  $('#lCurrentRound').text(currentValue + 1);
}
