import * as sl from "../../components/sparkline.ts";
const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from '../../../helpers/utilities.ts'

const infectedVarsObj = [
  {
    'variable': 'TotalInfected',
    'RName': '_TotalInfected',
    'display': 'Total Infected'
  },
  {
    'variable': 'NonSevereInfected',
    'RName': ['_TM_I1', '_TM_I2'],
    'display': 'Non-severe infected'
  },
  {
    'variable': 'SevereInfected',
    'RName': '_TM_IS',
    'display': 'Severe infected',
  },
  {
    'variable': 'QuarantineInfected',
    'RName': '_TM_IQ',
    'display': 'Infected in quarantine',
  },
  {
    'variable': 'AntiviralsInfected',
    'RName': '_TM_IAV',
    'display': 'Infected in antivirals'
  }
]



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
  //This should be a function---------------
  // d3.select(`#splTotalInfected`).remove();
  // d3.select(`#scTotalInfected`).remove();
  //----------------------------------------
  const team = $('#lTeamId').text();
  const stopTime = 20;
  infectedVarsObj.forEach(variableObj => {
    let yVariable;

    if(typeof(variableObj.RName) === 'string') {
      yVariable = `${team}${variableObj.RName}`;
    }

    if(Array.isArray(variableObj.RName)) {
      yVariable = variableObj.RName.map(variable => {
        return `${team}${variable}`
      })
    }
    console.log('yVariable');
    console.log(yVariable);

    const dataset = ut.create2DDataset('time', yVariable, simulationResults);

    const options = {
      'variable': variableObj.variable,
      'dataset': dataset,
      'stopTime': stopTime,
      'radius': 2,
      'duration': 1000,
      'delay': 1,
    };
    sl.createSparkline(options);
  })
}
