export const sections = [
  {
    'id': 'Infected',
    'variables': [
      {
        'id': 'TotalInfected',
        'RName': ['_TM_I1', '_TM_I2', '_TM_IS', '_TM_IQ', '_TM_IAV'],
        'display': 'Total Infected'
      },
      {
        'id': 'NonSevereInfected',
        'RName': ['_TM_I1', '_TM_I2'],
        'display': 'Non-severe infected'
      },
      {
        'id': 'SevereInfected',
        'RName': '_TM_IS',
        'display': 'Severe infected',
      },
      {
        'id': 'QuarantineInfected',
        'RName': '_TM_IQ',
        'display': 'Infected in quarantine',
      },
      {
        'id': 'AntiviralsInfected',
        'RName': '_TM_IAV',
        'display': 'Infected in antivirals'
      }
    ]
  },
  {
    'id': 'Resources',
    'variables': [
      {
        'id': 'FinancialResources',
        'RName':'_FM_R',
        'display': 'Financial resources'
      },
      {
        'id': 'Antivirals',
        'RName':'_AVR_AVS',
        'display': 'Antivirals'
      },
      {
        'id': 'Vaccines',
        'RName':'_VAC_VS',
        'display': 'Vaccines'
      },
      {
        'id': 'Ventilators',
        'RName':'_VEN_VS',
        'display': 'Ventilators'
      },
    ]
  }
]
