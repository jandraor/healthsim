const $ = require('jquery');
import * as ut from '../../helpers/utilities.ts';

export const getTeams = () => {
  const teams = [];
  $('.tdTeamName').each(function() {
    const team = this.id.replace('tdTeamName', '');
    teams.push(team);
  })
  return teams;
}

export const makeSuperDataset = (data, varName, teams, isFraction = false) => {
  let superDataset = [];

  teams.forEach(team => {
    const xLabel = 'time';
    let yLabel;
    if(!isFraction){
      yLabel = `${team}${varName}`;
    }

    if(isFraction){
      yLabel = [`${team}${varName[0]}`, `${team}${varName[1]}` ];
    }

    const twoDimDataset = ut.create2DDataset(xLabel, yLabel, data, isFraction);
    superDataset.push(twoDimDataset);
  });

  return superDataset;
}
