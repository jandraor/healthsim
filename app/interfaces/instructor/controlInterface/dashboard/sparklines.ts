const $ = require('jquery');
import * as sl from "../../../components/sparkline.ts";
import * as tbl from "../../../components/table.ts";
import * as instUt from '../../helpers.ts';
import * as ut from '../../../../helpers/utilities.ts';

export const build = initConditions => {

  initConditions.teams.forEach(team => {

    const options = {
      'height': 35,
      'width': 240,
      'variable': `Score${team.name}`,
      'tableId': 'tblSLScores',
      'circleRadius': 2,
      'display': team.name
    }
     sl.drawChart(options);
  });
}

export const update = results => {
  const teams = instUt.getTeams();
  const stopTime = parseInt($('#lStopTime').text());

  const superDataset = teams.map(team => {
    const yVar = `${team}_FM_COC`;
    const dataset = ut.create2DDataset('time', yVar, results);
    return dataset;
  });

  const limits = ut.findExtremePoints(superDataset);
  const domain = [limits.ymin, limits.ymax];

  teams.forEach(team => {
    const variable = `Score${team}`;
    sl.clearChart(variable);
    const yVar = `${team}_FM_COC`;
    const dataset = ut.create2DDataset('time', yVar, results);
    //console.table(dataset);

    sl.createSparkline({
      'variable': variable,
      'dataset': dataset,
      'stopTime': stopTime,
      'radius': 2,
      'duration': 1,
      'delay': 1,
      'domain': domain,
      'format': '.2s'
    })
  })
}

export const displayFinalScores = payload => {
  console.log('...displaying final scores...');
  const simResults = $('#selEpiVar').data('results');
  const lastRow = simResults[simResults.length - 1];

  const lastObject = payload[payload.length - 1];
  const bot = lastObject.bot;
  const lastRowBC = bot[bot.length - 1]
  const teams = instUt.getTeams();

  const comparisonObj = teams.map(team => {
    const costVar = `${team}_FM_COC`;
    const actualCost = lastRow[costVar];
    const baseCost = lastRowBC[costVar];

    return {
      'team': team,
      'actualCost': actualCost,
      'baseCost': baseCost,
      'difference': actualCost - baseCost,
      'relativeDiff': (actualCost / baseCost - 1) * - 1
    }
  });

  const relativeValues = comparisonObj.map(teamObj => {
    const rd = teamObj.relativeDiff

    const frd = rd // Formatted rd
      .toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 2});

    const icon = rd > 0 ?
      '<i class = "fas fa-arrow-up" style = "color:#aaf0d1"></i>': rd < 0 ?
        '<i class = "fas fa-arrow-down" style = "color:#ffcccb"></i>':
      '  <i class="fas fa-equals"></i>';

    return `${frd} ${icon}`
  })

  tbl.addColumn({
    'tableId': 'tblSLScores',
    'header': '<small>Result</small>',
    'values': relativeValues,
  });

  const winnerScore = Math.max.apply(null,
    comparisonObj.map(teamObj => {return teamObj.relativeDiff}));

  const winnerBadge = comparisonObj.map(teamObj => {
    const winnerIndicator = teamObj.relativeDiff === winnerScore ?
      '<i class="fas fa-trophy"></i>': ""
    return winnerIndicator
  });

  tbl.addColumn({
    'tableId': 'tblSLScores',
    'header': '<small>Winner</small>',
    'values': winnerBadge,
  })
}
