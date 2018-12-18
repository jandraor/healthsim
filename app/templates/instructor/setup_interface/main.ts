const $ = require('jquery');
import * as layout from './layout.ts';
import * as teamCard from './teamCard.ts';
import * as cfgIpts from './configInputs.ts'

export const build = teams => {
  const layoutHtml = layout.html();
  $('.hs-main').html(layoutHtml);
  const configInputsHtml = cfgIpts.html();
  $('#divConfigInputs').html(configInputsHtml);

  for(let i = 0; i < teams.length; i++) {
    const teamName = teams[i].name;
    $('#rowTeamCard').append(teamCard.html({teamName}));
    teams[i].players.forEach(elem => {
      const markup = `<li>${elem}</li`;
      $(`#playerList-${teams[i].name}`).append(markup);
    });
  }
}

export const addPlayer = (payload) => {
  const team = payload.team;
  const player = payload.player;
  const markup = `<li>${player}</li`;
  $(`#playerList-${team}`).append(markup)
}
