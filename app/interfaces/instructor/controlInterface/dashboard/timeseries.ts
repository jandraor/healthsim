const $ = require('jquery');
import * as ts from '../../../components/timeseries_line/main.ts';
import * as instUt from '../../helpers.ts';
import * as ut from '../../../../helpers/utilities.ts';
import * as instData from '../../data.ts';

export const build = options => {
  const teamNames = options.teams.map(teamObj => {return teamObj.name});
  const charts = [
    {
      'div': 'divSVGEpiCurves',
      'prefix': 'Epi'
    },
    {
      'div': 'divSVGInvTimeseries',
      'prefix': 'Inv'
    },
  ];

  charts.forEach(chart => {

    const specs = teamNames.map(name => {
      return {
        'svgId': `svgTSFacet${chart.prefix}${name}`,
        'title': name
      }
    });

    ts.drawGroupChart({
      'divId': chart.div,
      'specs': specs,
    });
  })
}

export const update = (newData, variable, prefix) => {
  const [variableObj] = instData.indicators.filter(variableObj => {
    return variableObj.id === variable});

  const RVar = variableObj.RName;
  const teams = instUt.getTeams();
  let ymax;

  if(variableObj.maxValue === 'variable') {
    const superDataset = instUt.makeSuperDataset(newData, RVar, teams);
    const limits = ut.findExtremePoints(superDataset);
    ymax = limits.ymax;
  }


  const stopTime = parseInt($('#lStopTime').text());
  const margin = {top: 30, right: 15, bottom: 50, left: 50};


  teams.forEach(team => {
    const svgId = `svgTSFacet${prefix}${team}`;
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
      'classLine': `tsLine${prefix} tsLine`,
      'tooltip': true,
      'yMax': ymax || variableObj.maxValue,
      'xTicks': 4,
      'tooltipType': 'facets'
    })
  });
}
