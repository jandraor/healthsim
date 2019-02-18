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
        'type': '',
      },
      {
        'id': 'NonSevereInfected',
        'RName': ['_TM_I1', '_TM_I2'],
        'display': 'Non-severe infected',
        'delay': true,
        'type': '',
      },
      {
        'id': 'SevereInfected',
        'RName': '_TM_IS',
        'display': 'Severe infected',
        'delay': true,
        'type': '',
      },
      {
        'id': 'QuarantineInfected',
        'RName': '_TM_IQ',
        'display': 'Infected in quarantine',
        'delay': true,
        'type': '',
      },
      {
        'id': 'AntiviralsInfected',
        'RName': '_TM_IAV',
        'display': 'Infected in antivirals',
        'delay': true,
        'type': '',
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
        'type': 'non-physical'
      },
      {
        'id': 'Antivirals',
        'RName':'_AVR_AVS',
        'display': 'Antivirals',
        'delay': false,
        'type': 'physical',
      },
      {
        'id': 'Vaccines',
        'RName':'_VAC_VS',
        'display': 'Vaccines',
        'delay': false,
        'type': 'physical',
      },
      {
        'id': 'Ventilators',
        'RName':'_VEN_VS',
        'display': 'Ventilators',
        'delay': false,
        'type': 'physical',
      },
    ]
  }
]
