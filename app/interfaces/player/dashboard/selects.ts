import * as select from "../../components/select.ts"

export const build = () => {
  const paramsObject = [
    {
      'items': [
        {'value': 'sInfected', 'text': 'Total Infected'},
        {'value': 'sInfected', 'text': 'Non-severe Infected'},
        {'value': 'sRecovered', 'text': 'Severe infected'},
        {'value': 'IR', 'text': 'Infected in quarantine'},
        {'value': 'RR', 'text': 'Infected in antivirals'}
      ],
      'selectId': 'selTSInfected',
    },
    {
      'items': [
        {'value': 'sResources', 'text': 'Financial resources'},
        {'value': 'sAnt', 'text': 'Antivirals'},
        {'value': 'sVac', 'text': 'Vaccines'},
        {'value': 'sVen', 'text': 'Ventilators'},
      ],
      'selectId': 'selTSResources'
    }
  ]

  paramsObject.forEach(params => {
    select.addOptions(params);
  });
  select.buildGroup('selDashboard');
}
