const $ = require('jquery');
import * as teamInfo from './teamInfo.ts';
import * as layout from './layout.ts';
import * as round from './round.ts';
import * as ut from '../../../../helpers/utilities.ts';
import * as bot from './bot.ts'; //behaviour over time
import * as kpi from './kpi.ts'; // key performance indicators
import * as SIRmodal from './SIR_modal.ts';
import * as mapModal from './mapModal.ts';

export const build = params => {
  const myTeam = params.yourTeam;
  const stopTime = params.rounds;
  const dashboard = $('#divDashboard');
  const layoutHtml = layout.html();
  dashboard.append(layoutHtml);
  $('#colBOT').append(bot.html());
  $('#colKPI').append(kpi.html());
  const paramsTeam = {
    'name': params.yourTeam,
    'population': ut.formatNumber(params.population),
    'incomeLevel': params.incomeLevel,
  }
  const teamInfoHtml = teamInfo.html({paramsTeam});
  $('#divTeamInfo').html(teamInfoHtml);
  const roundHtml = round.html({stopTime});
  $('#divRounds').html(roundHtml);
  addModals();
}

const addModals = () => {
  const SIRHtml = SIRmodal.html();
  $('body').prepend(SIRHtml);
  const mapHtml = mapModal.html();
  $('body').prepend(mapHtml);
}
