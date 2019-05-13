import * as ts from '../../../components/timeseries_line/main.ts';
import * as instUt from '../../helpers.ts';
import * as ut from '../../../../helpers/utilities.ts';
const $ = require('jquery');
import * as instData from '../../data.ts';

export const build = options => {
  ts.drawGroupChart({
    'divId': 'divSVGEpiCurves',
    'keys': options.teams,
  });
}

export const update = (newData, variable) => {
  const filterResult = instData.indicators.filter(variableObj => {
    return variableObj.id === variable});

  const variableObj = filterResult[0];
  const teams = instUt.getTeams();
  const stopTime = parseInt($('#lStopTime').text());
  const margin = {top: 30, right: 15, bottom: 50, left: 50};
  const RVar = variableObj.RName;

  teams.forEach(team => {
    const svgId = `svgTSFacet${team}`;
    ts.clearChart(svgId);

    let dataset;
    if(variableObj.type === 'atomic') {
      const yLabel = `${team}${RVar}`
      dataset = ut.create2DDataset('time', yLabel, newData)
    }

    if(variableObj.type === 'fraction') {
      const numerator = `${team}${RVar[0]}`;
      const denominator = `${team}${RVar[1]}`;
      const yLabel = [numerator, denominator];
      dataset = ut.create2DDataset('time', yLabel, newData, true)
    }

    ts.drawLine({
      'svgId': svgId,
      'superDataset': [dataset],
      'padding': margin,
      'finishTime': stopTime,
      'lineDuration': 0,
      'idLine': `tsLine${team}`,
      'classLine': 'tsLine',
      'tooltip': false,
      'yMax': variableObj.maxValue,
      'xTicks': 4,
    })
  });
}
