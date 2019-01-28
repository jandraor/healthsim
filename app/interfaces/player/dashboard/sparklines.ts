import * as sl from "../../components/sparkline.ts";
const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from '../../../helpers/utilities.ts';
import * as data from '../data.ts'

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
        {'name': 'FinancialResources', 'display': 'Financial resources'},
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
  const slParams = [
    {
      'variable': 'Antivirals',
      'value': Math.round(initParams.resources.antivirals),
    },
    {
      'variable': 'Vaccines',
      'value': Math.round(initParams.resources.vaccines),
    },
    {
      'variable': 'Ventilators',
      'value': Math.round(initParams.resources.ventilators),
    },
    {
      'variable': 'FinancialResources',
      'value':  Math.round(initParams.resources.financial),
    },
    {
      'variable': 'TotalInfected',
      'value':  Math.round(initParams.infected.total),
    },
    {
      'variable': 'NonSevereInfected',
      'value':  Math.round(initParams.infected.nonSevere),
    },
    {
      'variable': 'SevereInfected',
      'value':  Math.round(initParams.infected.severe),
    },
    {
      'variable': 'QuarantineInfected',
      'value':  Math.round(initParams.infected.quarantine),
    },
    {
      'variable': 'AntiviralsInfected',
      'value':  Math.round(initParams.infected.antivirals),
    },
  ]
  slParams.forEach(params => {
    sl.setInitValue(params.variable, params.value);
  })
}

export const draw = simulationResults => {
  const team = $('#lTeamId').text();
  const stopTime = parseInt($('#lStopTime').text());

  data.sections.forEach(sectionObject => {
    let superDataset = []; //Used only if scale === 'fixed'
    const optionsObj = sectionObject.variables.map(variableObj => {
      let yVariable;
      if(typeof(variableObj.RName) === 'string') {
        yVariable = `${team}${variableObj.RName}`;
      }

      if(Array.isArray(variableObj.RName)) {
        yVariable = variableObj.RName.map(variable => {
          return `${team}${variable}`
        });
      }

      const dataset = ut.create2DDataset('time', yVariable, simulationResults);
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
      sl.createSparkline(options);
    })


  });
}
