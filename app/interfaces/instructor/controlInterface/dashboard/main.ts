const $ = require('jquery');
import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';
import * as select from './select.ts';
import * as barchart from './barchart.ts';
import * as timeseries from './timeseries.ts';
import * as sparklines from './sparklines.ts';
import * as ut from '../../../../helpers/utilities.ts';

export const build = options => {
  heatmap.build(options);
  select.build();
  chord.build();
  barchart.build();
  timeseries.build(options);
  sparklines.build(options);
}

export const update = resultObj => {
  $('#selRelRes').data('data', resultObj.donations);
  const currentData = $('#selEpiVar').data('results');

  let results;
  if($.isEmptyObject(currentData)) {
    $('#selEpiVar').data('results', resultObj.bot);
    results = resultObj.bot;
  }

  if(!$.isEmptyObject(currentData)) {
    const updatedData = ut.bindData(currentData, resultObj.bot);
    $('#selEpiVar').data('results', updatedData);
    results = updatedData;
  }

  //----------------------------------------------------------------------------
  //Updating scores
  sparklines.update(results);
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  //Updates heatmaps & timeseries
  const tabs = ['Epi', 'Inv'];

  tabs.forEach(tab => {
    const variable = $(`#sel${tab}Var`).val();
    heatmap.update(results, variable, tab);
    timeseries.update(results, variable, tab);
  })
  //----------------------------------------------------------------------------
  const resource = $('#selRelRes').val();
  const allDonations = resultObj.donations;
  const oneResourceDonations = allDonations[resource]
  const totalDonations = ut.sumMatrix(oneResourceDonations);
  if(totalDonations === 0){
    chord.empty();
    $('#lTotalDonations').text(0);
    barchart.empty();
    return
  }
  $('#lTotalDonations').text(totalDonations);
  chord.update(oneResourceDonations, allDonations.names_order);
  barchart.update(oneResourceDonations, allDonations.names_order);
}

export const displayFinalScores = payload => {
  sparklines.displayFinalScores(payload);
}
