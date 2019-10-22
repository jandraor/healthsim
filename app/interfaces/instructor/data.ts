//Must be implemented in a database

export const indicators = [
  {
    'id': 'TotalInfected',
    'type': 'atomic',
    'RName': '_TotalInfected',
    'maxValue': 15000,
  },
  {
    'id': 'InfectedPerCapita',
    'type': 'fraction',
    'RName': ['_TotalInfected', '_TotalPopulation'],
    'maxValue': 1,
  },
  {
    'id': 'Antivirals',
    'type': 'atomic',
    'RName': '_AVR_AVS',
    'maxValue': 'variable',
  },
  {
    'id': 'Vaccines',
    'type': 'atomic',
    'RName': '_VAC_VS',
    'maxValue': 'variable',
  },
  {
    'id': 'Ventilators',
    'type': 'atomic',
    'RName': '_VEN_VS',
    'maxValue': 'variable',
  },
]
