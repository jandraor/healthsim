const $ = require('jquery');
import * as layout from './layout.ts';
import * as prgBar from './progressBar.ts';
import * as simBut from './simulateButton.ts';
import * as tblTms from './teams.ts';
import * as rowTms from './teamRow.ts';
import * as chat from './chat.ts';

export const build = (teams) => {
  const layoutHtml = layout.html();
  $('body').html(layoutHtml);
  const progressBarHtml = prgBar.html();
  $('#divProgress').html(progressBarHtml);
  const simulateButtonHtml = simBut.html();
  $('#divSimulateButton').html(simulateButtonHtml);
  const tableTeamsHtml = tblTms.html();
  $('#divTeams').html(tableTeamsHtml);
  teams.map(teamName => {
    const rowTeamHtml = rowTms.html({teamName});
    $('.tblTeams').append(rowTeamHtml);
  });
  const chatHtml = chat.html();
  $('.instructorChat').html(chatHtml);

}
