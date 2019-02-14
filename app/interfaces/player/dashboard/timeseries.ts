import * as tsline from "../../components/timeseries_line/main.ts";
import * as data from "../data.ts";
const $ = require('jquery');
import * as help from './helpers/main.ts';

const padding = {
  'top': 10,
  'left': 50,
  'bottom': 30,
  'right': 30
}

export const buildCharts = stopTime => {
  const sections = ['Infected', 'Resources'];

  sections.forEach(section => {
    const options = {
        'xmin': 0,
        'xmax': stopTime,
        'ymin': 0,
        'ymax': 100,
        'width': 400,
        'height': 230,
        'padding': padding,
        'svgId': `svgTS${section}`,
    }
    tsline.drawChart(options);
  });
}

export const drawAll = simulationResult => {
  const team = $('#lTeamId').text();
  $('#divDashboard select').each(function(i) {
    const section = this.id.replace('selTS', '');
    const variable = $(this).val();
    const dataset = help.applyInfoDelay(variable, section, simulationResult);
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
    'padding': padding,
    'finishTime': stopTime,
    'lineDuration': 2000,
    'idLine': params.idLine,
    'classLine': 'tsLine',
    'tooltip': false,
  }
  tsline.drawLine(tsParams);
}
