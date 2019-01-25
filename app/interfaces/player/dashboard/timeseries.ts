import * as tsline from "../../components/timeseries_line/main.ts";
import * as ut from '../../../helpers/utilities.ts';
import * as data from "../data.ts";
const $ = require('jquery');
import * as objectQueries from '../objectQueries.ts';

export const buildCharts = stopTime => {
  const sections = ['Infected', 'Resources'];

  sections.forEach(section => {
    const options = {
        'xmin': 0,
        'xmax': stopTime,
        'ymin': 0,
        'ymax': 100,
        'width': 400,
        'height': 250,
        'padding': 50,
        'svgId': `svgTS${section}`,
    }
    tsline.drawChart(options);
  });
}

export const drawAll = simulationResults => {
  const team = $('#lTeamId').text();
  $('#divDashboard select').each(function(i) {
    const section = this.id.replace('selTS', '');
    const variable = $(this).val();
    const yVariable = objectQueries.getRVariables(variable, section, team);
    const dataset = ut.create2DDataset('time', yVariable, simulationResults);
    const superDataset = [dataset];

    const params = {
      'svgId': `svgTS${section}`,
      'superDataset': superDataset,
      'idLine': `tsLineInfected${section}`,
    }
    draw(params);
  });
}

export const draw = params => {
  tsline.clearChart(params.svgId);
  const stopTime = parseInt($('#lStopTime').text());
  
  const tsParams = {
    'svgId': params.svgId,
    'superDataset': params.superDataset,
    'padding': 50,
    'finishTime': stopTime,
    'lineDuration': 2000,
    'idLine': params.idLine,
    'classLine': 'tsLine',
    'tooltip': false,
  }
  tsline.drawLine(tsParams);
}
