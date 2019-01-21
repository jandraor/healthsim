import * as tsline from "../../components/timeseries_line/main.ts";
import * as ut from '../../../helpers/utilities.ts';
import * as data from "./data.ts";
const $ = require('jquery');

export const buildCharts = params => {
  const sections = ['Infected', 'Resources'];

  sections.forEach(section => {
    const options = {
        'xmin': 0,
        'xmax': params.rounds,
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

export const draw = simulationResults => {
  const team = $('#lTeamId').text();
  $('#divDashboard select').each(function(i) {
    const section = this.id.replace('selTS', '');

    const sectionObject = data.sections.filter(sectionObject => {
      return sectionObject.id === section;
    });

    const variable = $(this).val();

    const variableObject = sectionObject[0].variables.filter(variableObject => {
      return variableObject.id === variable;
    });

    const RName = variableObject[0].RName;

    let yVariable;
    if(typeof(RName) === 'string') {
      yVariable = `${team}${RName}`;
    }

    if(Array.isArray(RName)) {
      yVariable = RName.map(variable => {
        return `${team}${variable}`
      })
    }

    const dataset = ut.create2DDataset('time', yVariable, simulationResults);
    const superDataset = [dataset];

    const params = {
      'svgId': `svgTS${section}`,
      'superDataset': superDataset,
      'padding': 50,
      'finishTime': 20,
      'lineDuration': 2000,
      'idLine': `tsLineInfected${section}`,
      'classLine': 'tsLine',
      'tooltip': false,
    }
    tsline.drawLine(params);
  });
}
