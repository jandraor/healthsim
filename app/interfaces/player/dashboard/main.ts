import * as timeseries from './timeseries.ts';
import * as selects from './selects.ts';
import * as sparklines from './sparklines.ts';
import * as ut from '../../../helpers/utilities.ts';
const $ = require('jquery');

export const build = initParams => {
  const stopTime = initParams.rounds;
  timeseries.buildCharts(stopTime);
  selects.build();
  sparklines.build(initParams);
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

  const lastRow = results[results.length - 1]
  const lastTime = Math.trunc(lastRow.time);
  $('#lCurrentRound').text(lastTime);
  sparklines.draw(results);
  timeseries.drawAll(results);
}