const $ = require('jquery');
import * as saf from '../../components/stocksandflows.ts';
import * as data from '../data.ts';
import * as ut from '../../../helpers/utilities.ts';
import * as utPlayer from './helpers/main.ts';


export const build = initParams => {
  const informationDelay = $('#lIncome').data('reportingDelay');
  const population = initParams.population;
  const infected = initParams.sir.infected;
  const isDelayed = informationDelay > 0 ? true : false;
  const xPos1stColumn = 41
  const xPos2ndColumn = 180;
  const xPos3rdColumn = 320;
  const xPos4thColumn = 460;
  const xPos5thColumn = 600;
  const yPos1stRow = 41;
  const yPos2ndRow = 140;
  const yPos3rdRow = 240;
  const yPos4thRow = 340;
  const yPos5thRow = 440;
  const yPos7thRow = 560;
  const yPos6thRow = (yPos5thRow + yPos7thRow) / 2;

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos1stColumn,
      'y': yPos3rdRow,
      'leftFlow': false,
      'topFlow': true,
      'rightFlow': true,
      'bottomFlow': true,
      'title': 'Susceptible',
      'stockId': 'sSusceptible',
      'initValue': isDelayed ? '---' : population - infected
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos2ndColumn,
      'y': yPos3rdRow,
      'leftFlow': true,
      'topFlow': true,
      'rightFlow': true,
      'bottomFlow': false,
      'title': 'Infected 1',
      'stockId': 'sInfected1',
      'initValue': isDelayed ? '---' : infected
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos3rdColumn,
      'y': yPos3rdRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': true,
      'title': 'Infected 2',
      'stockId': 'sInfected2',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos4thColumn,
      'y': yPos3rdRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Infected', 'in Quarantine'],
      'stockId': 'sInfectedQuarantine',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos5thColumn,
      'y': yPos3rdRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Recovered', 'from quarantine'],
      'stockId': 'sRecoveredQuarantine',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos5thColumn,
      'y': yPos4thRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Recovered', 'no intervention'],
      'stockId': 'sRecoveredNoIntervention',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos5thColumn,
      'y': yPos2ndRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Recovered', 'from antivirals'],
      'stockId': 'sRecoveredAntivirals',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos5thColumn,
      'y': yPos1stRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': 'Vaccinated',
      'stockId': 'sVaccinated',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos5thColumn,
      'y': yPos5thRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': true,
      'title': ['Recovered', 'severe'],
      'stockId': 'sRecoveredSevere',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos5thColumn,
      'y': yPos7thRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': false,
      'bottomFlow': false,
      'title': ['Long-term', 'morbidity'],
      'stockId': 'sLongTermMorbidity',
      'initValue': isDelayed ? '---' : 0

    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos3rdColumn,
      'y': yPos6thRow,
      'leftFlow': true,
      'topFlow': true,
      'rightFlow': false,
      'bottomFlow': true,
      'title': ['Infected', 'severe'],
      'stockId': 'sInfectedSevere',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos4thColumn,
      'y': yPos5thRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Resource', 'recovery'],
      'stockId': 'sResourceAidedRecovery',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos4thColumn,
      'y': yPos7thRow,
      'leftFlow': true,
      'topFlow': true,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Non-resource', 'recovery'],
      'stockId': 'sNonResourceRecovery',
      'initValue': isDelayed ? '---' : 0
    }
  );

  saf.drawStock2(
    {
      'svgId': 'svgSIR',
      'x': xPos3rdColumn,
      'y': yPos2ndRow,
      'leftFlow': true,
      'topFlow': false,
      'rightFlow': true,
      'bottomFlow': false,
      'title': ['Infected', 'on antivirals'],
      'stockId': 'sInfectedAntivirals',
      'initValue': isDelayed ? '---' : 0
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

export const update = simData => {
  saf.clearIndicators('svgSIR');
  const stopTime = parseInt($('#lStopTime').text());
  const team = $('#lTeamId').text();
  const informationDelay = $('#lIncome').data('reportingDelay');
  const currentRound = parseInt($('#lCurrentRound').text());
  const upperLimit = currentRound - informationDelay;
  const population = parseFloat($('#lPopulation').data('value'));

  const [transimisionSector] = data.modelStocks.filter(secObj => {
    return secObj.sector === 'transmission'
  });

  const stocks = transimisionSector.stocks;

  stocks.forEach(stock => {
    const variable = `${team}${stock.RName}`;
    const dataset = ut.create2DDataset('time', variable, simData);
    const delayedDataset = utPlayer.delayDataset(dataset);

    if(upperLimit <= 0) {
      saf.updateIndicator({
        'svgId': 'svgSIR',
        'stockId': stock.id,
        'value': delayedDataset[0].y
      })
    }

    if (upperLimit > 0) {
      saf.addSparkline({
        'stockId': stock.id,
        'sparkline': {
          'svgId': 'svgSIR',
          'dataset': delayedDataset,
          'stopTime': stopTime,
          'radius': 1,
          'delay': 1,
          'duration': 1000,
          'format': '.2s',
          'yDomain': [0, population]
        }
      });
    }
  });
}
