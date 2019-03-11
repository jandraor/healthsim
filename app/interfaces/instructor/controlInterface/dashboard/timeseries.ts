import * as ts from '../../../components/timeseries_line/main.ts';
import * as instUt from '../../helpers.ts';
import * as ut from '../../../../helpers/utilities.ts';
const $ = require('jquery');

export const build = options => {
  ts.drawGroupChart({
    'divId': 'divSVGEpiCurves',
    'keys': options.teams,
  });
}

export const update = newData => {
  console.log('--------------new data:---------------');
  console.log(newData);
  console.log('--------------new data:---------------');
  const teams = instUt.getTeams();
  const stopTime = parseInt($('#lStopTime').text());
  teams.forEach(team => {
    const svgId = `svgTSFacet${team}`;
    ts.clearChart(svgId);
    const margin = {top: 30, right: 15, bottom: 50, left: 50};
    const infectedVariables = ['_TM_I1', '_TM_I2', '_TM_IQ', '_TM_IAV', '_TM_IS']
    const yLabel = infectedVariables.map(variable => {
      return `${team}${variable}`
    });
    const dataset = ut.create2DDataset('time', yLabel, newData)
    // chart must be cleared
    ts.drawLine({
      'svgId': svgId,
      'superDataset': [dataset],
      'padding': margin,
      'finishTime': stopTime,
      'lineDuration': 0,
      'idLine': `tsLine${team}`,
      'classLine': 'tsLine',
      'tooltip': false,
      'yMax': 30000,
    })
  });
}
