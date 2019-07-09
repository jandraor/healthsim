//This should be replaced by a database
export const sections = [
  {
    'id': 'SIR',
    'slScale': 'fixed', //sparkline scale
    'variables': [
      {
        'id': 'Susceptible',
        'RName': '_TM_S',
        'display': 'Susceptible',
        'delay': true,
        'type': '',
      },
      {
        'id': 'Infected',
        'RName': ['_TM_I1', '_TM_I2', '_TM_IS', '_TM_IQ', '_TM_IAV', '_TM_NRR', '_TM_RAR'],
        'display': 'Infected',
        'delay': true,
        'type': '',
      },
      {
        'id': 'Recovered',
        'RName': ['_TM_RV', '_TM_IAV', '_TM_RQ', '_TM_RNI', '_TM_RS', '_TM_LTM'],
        'display': 'Recovered',
        'delay': true,
        'type': '',
      },
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

export const modelStocks = [{
  'sector': 'transmission',
  'stocks': [
    {
      'id': 'sSusceptible',
      'RName': '_TM_S',
    },
    {
      'id': 'sInfected1',
      'RName': '_TM_I1',
    },
    {
      'id': 'sInfected2',
      'RName': '_TM_I2',
    },
    {
      'id': 'sInfectedQuarantine',
      'RName': '_TM_IQ',
    },
    {
      'id': 'sRecoveredQuarantine',
      'RName': '_TM_RQ',
    },
    {
      'id': 'sRecoveredNoIntervention',
      'RName': '_TM_RNI',
    },
    {
      'id': 'sRecoveredAntivirals',
      'RName': '_TM_IAV',
    },
    {
      'id': 'sVaccinated',
      'RName': '_TM_RV',
    },
    {
      'id': 'sRecoveredSevere',
      'RName': '_TM_RS',
    },
    {
      'id': 'sLongTermMorbidity',
      'RName': '_TM_LTM',
    },
    {
      'id': 'sInfectedSevere',
      'RName': '_TM_IS',
    },
    {
      'id': 'sResourceAidedRecovery',
      'RName': '_TM_RAR',
    },
    {
      'id': 'sNonResourceRecovery',
      'RName': '_TM_NRR',
    },
    {
      'id': 'sInfectedAntivirals',
      'RName': '_TM_IAV',
    },
  ]
}]
