const $ = require('jquery');
import * as layout from './layout.ts';
import * as buttons from './controlButtons.ts';
import * as teamTable from './teamTable.ts';
import * as teamRow from './teamRow.ts';
import * as ut from '../../../../helpers/utilities.ts';

export const build = params => {
  const stopTime = params.rounds;
  $('#divControlboard').html(layout.html({stopTime}));
  const buttonsHtml = buttons.html();
  $('#divControlButtons').html(buttonsHtml);
  const teamTableHtml = teamTable.html();
  $('#divTeams').html(teamTableHtml);
  const teams = params.teams
  teams.map(teamInfo => {
    const logo = require(`../../../../img/teams/${teamInfo.name}.svg`)
    const team = {
      'name': teamInfo.name,
      'population': ut.formatNumber(teamInfo.population),
      'incomeLevel': teamInfo.incomeLevel,
      'logo': logo
    }
    const teamRowHtml = teamRow.html({team});
    $('.tblTeams').append(teamRowHtml);
  });
}
