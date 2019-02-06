const $ = require('jquery');
import * as teamInfo from './teamInfo.ts';
import * as layout from './layout.ts';
import * as round from './round.ts'

export const build = params => {
  const myTeam = params.yourTeam;
  const stopTime = params.rounds;
  const dashboard = $('#divDashboard');
  const layoutHtml = layout.html();
  dashboard.append(layoutHtml);
  const paramsTeam = {
    'name': params.yourTeam,
    'population': params.population,
    'incomeLevel': params.incomeLevel,
  }
  const teamInfoHtml = teamInfo.html({paramsTeam});
  $('#divTeamInfo').html(teamInfoHtml);
  const roundHtml = round.html({stopTime});
  $('#divRounds').html(roundHtml);
}
