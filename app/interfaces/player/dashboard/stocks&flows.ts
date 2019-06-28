import * as saf from '../../components/stocksandflows.ts';

export const build = () => {
  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 50,
      'y': 200,
      'leftFlow': false,
      'topFlow': true,
      'rightFlow': true,
      'bottomFlow': true,
      'title': 'Susceptible',
      'stockId': 'sSusceptible'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 200,
      'y': 200,
      'leftFlow': true,
      'topFlow': true,
      'rightFlow': true,
      'bottomFlow': false,
      'title': 'Infected 1',
      'stockId': 'sInfected1'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 300,
      'y': 200,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': true,
      'title': 'Infected 2',
      'stockId': 'sInfected2'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 400,
      'y': 200,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Infected', 'in Quarantine'],
      'stockId': 'sInfectedQuarantine'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 500,
      'y': 200,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Recovered', 'from quarantine'],
      'stockId': 'sRecoveredQuarantine'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 500,
      'y': 275,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Recovered', 'no intervention'],
      'stockId': 'sRecoveredNoIntervention'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 500,
      'y': 125,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Recovered', 'from antivirals'],
      'stockId': 'sRecoveredAntivirals'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 500,
      'y': 50,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': 'Vaccinated',
      'stockId': 'sVaccinated'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 500,
      'y': 350,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': true,
      'title': ['Recovered', 'severe'],
      'stockId': 'sRecoveredSevere'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 500,
      'y': 450,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Long-term', 'morbidity'],
      'stockId': 'sLongTermMorbidity'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 300,
      'y': 387.5,
      'leftFlow': true,
      'topFlow': true,
      'rightFlow': false,
      'bottomFlow': true,
      'title': ['Infected', 'severe'],
      'stockId': 'sInfectedSevere'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 400,
      'y': 350,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Resource', 'recovery'],
      'stockId': 'sResourceAidedRecovery'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 400,
      'y': 450,
      'leftFlow': true,
      'topFlow': true,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Non-resource', 'recovery'],
      'stockId': 'sNonResourceRecovery'
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': 300,
      'y': 125,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Infected', 'on antivirals'],
      'stockId': 'sInfectedAntivirals'
    }
  );
  //============================================================================
  // Flows
  //============================================================================


  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sSusceptible',
    'destinationStock': 'sInfected1',
    'flowType': 'regular',
    'title': 'Infection rate',
    'flowId': 'fIR'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfected1',
    'destinationStock': 'sInfected2',
    'flowType': 'regular',
    'title': 'IR1',
    'flowId': 'fIR1'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfected2',
    'destinationStock': 'sInfectedQuarantine',
    'flowType': 'regular',
    'title': 'QF',
    'flowId': 'fQF'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfectedQuarantine',
    'destinationStock': 'sRecoveredQuarantine',
    'flowType': 'regular',
    'title': 'RRQ',
    'flowId': 'fRRQ'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sResourceAidedRecovery',
    'destinationStock': 'sRecoveredSevere',
    'flowType': 'regular',
    'title': 'RRS',
    'flowId': 'fRRS'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sResourceAidedRecovery',
    'destinationStock': 'sRecoveredSevere',
    'flowType': 'regular',
    'title': 'RRS',
    'flowId': 'fRRS'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sNonResourceRecovery',
    'destinationStock': 'sLongTermMorbidity',
    'flowType': 'regular',
    'title': 'DR',
    'flowId': 'fDR'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfectedAntivirals',
    'destinationStock': 'sRecoveredAntivirals',
    'flowType': 'regular',
    'title': 'RRAV',
    'flowId': 'fRRAV'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sSusceptible',
    'destinationStock': 'sVaccinated',
    'flowType': 'bent',
    'title': 'VR',
    'flowId': 'fVR'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfected1',
    'destinationStock': 'sInfectedAntivirals',
    'flowType': 'bent',
    'title': 'IRAV',
    'flowId': 'fIRAV'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfectedSevere',
    'destinationStock': 'sResourceAidedRecovery',
    'flowType': 'bent',
    'title': 'ISR',
    'flowId': 'fISR'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sSusceptible',
    'destinationStock': 'sInfectedSevere',
    'flowType': 'bent',
    'title': 'IRS',
    'flowId': 'fIRS'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfectedSevere',
    'destinationStock': 'sNonResourceRecovery',
    'flowType': 'bent',
    'title': 'ISNR',
    'flowId': 'fISNR'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sInfected2',
    'destinationStock': 'sRecoveredNoIntervention',
    'flowType': 'bent',
    'title': 'RR',
    'flowId': 'fRR'
  });

  saf.drawFlow2({
    'svgId': 'svgSIR',
    'originStock': 'sNonResourceRecovery',
    'destinationStock': 'sRecoveredSevere',
    'flowType': 'double-bent',
    'title': 'NRRR',
    'flowId': 'fNRR'
  });
}
