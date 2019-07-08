const $ = require('jquery');
import * as arcMeter from '../../components/arcMeter.ts';
import * as objectQueries from '../objectQueries.ts';
import * as help from './helpers/main.ts';

export const build = initParams => {
  const population = initParams.population;
  const infected = initParams.sir.infected;
  const antivirals = initParams.resources.antivirals;
  const ventilators = initParams.resources.ventilators;
  const vaccines = initParams.resources.vaccines;
  const informationDelay = $('#lIncome').data('reportingDelay');

  const infValue = infected  / population;
  let initNA = false;

  if(informationDelay > 0){
    initNA = true;
  }

  arcMeter.initialise({
    'svg': 'svgInfectedPct',
    'height': 120,
    'width': 120,
    'variable': '%',
    'value': infValue,
    'initNA': initNA,
    'innerRadius': 45,
  });

  const vacvalue = vaccines / population
  arcMeter.initialise({
    'svg': 'svgVacCov',
    'height': 90,
    'width': 90,
    'variable': '%',
    'value': vacvalue,
    'innerRadius': 35,
  });
  const antvalue =   antivirals / population//antivirals / population
  arcMeter.initialise({
    'svg': 'svgAntCov',
    'height': 90,
    'width': 90,
    'variable': '%',
    'value': antvalue,
    'innerRadius': 35,
  });

  const venvalue =   ventilators / population//antivirals / population
  arcMeter.initialise({
    'svg': 'svgVenCov',
    'height': 90,
    'width': 90,
    'variable': '%',
    'value': venvalue,
    'innerRadius': 35,
  });
}

export const update = results => {
  const lastRow = results[results.length - 1];
  const population = $('#lPopulation').data('value');
  const team = $('#lTeamId').text();
  const infectedDelayed = help.applyInfoDelay('Infected', 'SIR', results);
  if(infectedDelayed.length > 0 ) {
    const infected = infectedDelayed[infectedDelayed.length - 1].y;
    arcMeter.update({
      'svg': `svgInfectedPct`,
      'value': infected / population,
      'innerRadius': 45,
    });
  }

  const phyResObj = objectQueries.getPhysicalResources();
  phyResObj.forEach(resource => {
    const prefix = resource.id.substring(0,3);
    const varName = objectQueries.getRVariables(resource.id, 'Resources', team);
    const value = lastRow[varName] / population;
    arcMeter.update({
      'svg': `svg${prefix}Cov`,
      'value': value,
      'innerRadius': 35,
    });
  })
}
