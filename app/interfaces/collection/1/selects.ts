import * as select from "../../components/select.ts"

export const build = () => {
  const items = [
    {'value': 'sSusceptible', 'text': 'Susceptible'},
    {'value': 'sInfected', 'text': 'Infected'},
    {'value': 'sRecovered', 'text': 'Recovered'},
    {'value': 'IR', 'text': 'Infection rate'},
    {'value': 'RR', 'text': 'Recovery rate'}
  ]

  const params = {
    'items': items,
    'selectId': 'selVarSF',
  }
  select.addOptions(params);
  select.buildGroup('divTSSF');
}
