import * as sl from "../../components/sparkline.ts";

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
