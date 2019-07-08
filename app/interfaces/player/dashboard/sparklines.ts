import * as sl from "../../components/sparkline.ts";
const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from '../../../helpers/utilities.ts';
import * as help from './helpers/main.ts';
import * as data from '../data.ts';
import * as objectQueries from '../objectQueries.ts';

const svgIdEconPerf = 'svgEconPerf';

export const build = (initParams) => {
  const variableList = [
    {
      'tableId': 'tblSIR',
      'slElements': [
        {'name': 'Susceptible', 'display': 'Susceptible'},
        {'name': 'Infected', 'display': 'Infected'},
        {'name': 'Recovered', 'display': 'Recovered'},
      ]
    },
    {
      'tableId': 'tblSLResources',
      'slElements': [
        {'name': 'Financial', 'display': 'Financial resources'},
        {'name': 'Antivirals', 'display': 'Antivirals'},
        {'name': 'Vaccines', 'display': 'Vaccines'},
        {'name': 'Ventilators', 'display': 'Ventilators'},
      ]
    }
  ];

  variableList.forEach(slGroupData => {
    const tableId = slGroupData.tableId;
    const slElements = slGroupData.slElements;

    slElements.forEach(slElement => {
      const options = {
        'height': 30,
        'width': 120,
        'variable': slElement.name,
        'tableId': tableId,
        'circleRadius': 2,
        'display': slElement.display
      }
       sl.drawChart(options);
    });
  });

  sl.drawChart2({
    'svgId': svgIdEconPerf,
    'title': 'Cumulative loss',
    'width': {
      'sparkline': 130,
      'title': 130
    },
    'height': 30,
    'initValue': '$ 0'
  });

  setInitialValues(initParams);
}

export const setInitialValues = initParams => {
  data.sections.forEach(sectionObject => {
    const optionsObj = sectionObject.variables.map(variableObj => {
      const variable = variableObj.id
      const section = sectionObject.id;
      const stopTime = parseInt($('#lStopTime').text());
      const informationDelay = $('#lIncome').data('reportingDelay');
      const isDelayed = objectQueries.isDelayed(variable, section);

      if (!isDelayed || (isDelayed && informationDelay === 0)) {
        const sectionLC = section.toLowerCase();
        console.log(`section: ${sectionLC}`);
        const variableLC = variable.toLowerCase();
        console.log(`variableLC: ${variableLC}`);
        const yValue = Math.round(initParams[sectionLC][variableLC]);
        console.log(`yValue : ${yValue}`)
        const dataset = [{'x': 0, 'y': yValue}];
        const options = {
          'variable':variableObj.id,
          'dataset': dataset,
          'stopTime': stopTime,
          'radius':2,
          'duration': 1,
          'delay': 1,
        }
        sl.createSparkline(options);
      }

    });
  });
}

export const draw = simulationResult => {
  const team = $('#lTeamId').text();
  const stopTime = parseInt($('#lStopTime').text());

  data.sections.forEach(sectionObject => {
    const section = sectionObject.id;
    let superDataset = []; //Used only if scale === 'fixed';

    const optionsObj = sectionObject.variables.map(variableObj => {
      const variable = variableObj.id;
      const dataset = help.applyInfoDelay(variable, section, simulationResult);
      superDataset.push(dataset);
      const options = {
        'variable': variableObj.id,
        'dataset': dataset,
        'stopTime': stopTime,
        'radius': 2,
        'duration': 1000,
        'delay': 1,
      };
      return options
    });

    optionsObj.forEach(options => {
      sl.clearChart(options.variable);

      if(sectionObject.slScale === 'fixed') {
        const limits = ut.findExtremePoints(superDataset);
        const domain = [limits.ymin, limits.ymax]
        options['domain'] = domain;
      }

      if(options.dataset.length > 0){
        sl.createSparkline(options);
      }
    });
  });

  //Cumulative economic loss
  sl.clearChart2(svgIdEconPerf)
  const dataset = ut.create2DDataset('time', `${team}_FM_COC`, simulationResult,);

  sl.drawLine({
    'svgId': svgIdEconPerf,
    'dataset': dataset,
    'stopTime': stopTime,
    'radius': 3,
    'duration': 1000,
    'delay': 1,
    'format': '.2s',
    'prefix': '$'
  });
}
