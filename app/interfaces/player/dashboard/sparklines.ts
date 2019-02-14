import * as sl from "../../components/sparkline.ts";
const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from '../../../helpers/utilities.ts';
import * as help from './helpers/main.ts';
import * as data from '../data.ts';
import * as objectQueries from '../objectQueries.ts';

export const build = (initParams) => {
  const variableList = [
    {
      'tableId': 'tblSLInfected',
      'slElements': [
        {'name': 'TotalInfected', 'display': 'Total Infected'},
        {'name': 'NonSevereInfected', 'display': 'Non-severe infected'},
        {'name': 'SevereInfected', 'display': 'Severe infected'},
        {'name': 'QuarantineInfected', 'display': 'Infected in quarantine'},
        {'name': 'AntiviralsInfected', 'display': 'Infected in antivirals'}
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
        const variableLC = variable.toLowerCase();
        const yValue = Math.round(initParams[sectionLC][variableLC]);
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
}
