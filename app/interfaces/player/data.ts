//This should be replaced by a database
export const sections = [
  {
    'id': 'Infected',
    'slScale': 'fixed', //sparkline scale
    'variables': [
      {
        'id': 'TotalInfected',
        'RName': ['_TM_I1', '_TM_I2', '_TM_IS', '_TM_IQ', '_TM_IAV'],
        'display': 'Total Infected',
        'delay': true,
      },
      {
        'id': 'NonSevereInfected',
        'RName': ['_TM_I1', '_TM_I2'],
        'display': 'Non-severe infected',
        'delay': true,
      },
      {
        'id': 'SevereInfected',
        'RName': '_TM_IS',
        'display': 'Severe infected',
        'delay': true,
      },
      {
        'id': 'QuarantineInfected',
        'RName': '_TM_IQ',
        'display': 'Infected in quarantine',
        'delay': true,
      },
      {
        'id': 'AntiviralsInfected',
        'RName': '_TM_IAV',
        'display': 'Infected in antivirals',
        'delay': true,
      }
    ]
  },
  {
    'id': 'Resources',
    'slScale': 'free',
    'variables': [
      {
        'id': 'Financial',
        'RName':'_FM_R',
        'display': 'Financial',
        'delay': false,
      },
      {
        'id': 'Antivirals',
        'RName':'_AVR_AVS',
        'display': 'Antivirals',
        'delay': false,
      },
      {
        'id': 'Vaccines',
        'RName':'_VAC_VS',
        'display': 'Vaccines',
        'delay': false,
      },
      {
        'id': 'Ventilators',
        'RName':'_VEN_VS',
        'display': 'Ventilators',
        'delay': false
      },
    ]
  }
]
