//Must be implemented in a database

export const indicators = [
  {
    'id': 'TotalInfected',
    'type': 'atomic',
    'RName': '_TotalInfected',
    'maxValue': 30000,
  },
  {
    'id': 'InfectedPerCapita',
    'type': 'fraction',
    'RName': ['_TotalInfected', '_TotalPopulation'],
    'maxValue': 1,
  },
]
