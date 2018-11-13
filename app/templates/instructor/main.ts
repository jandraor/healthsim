const $ = require('jquery');
import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';
import * as setup from './setup.ts';
import * as teamCard from './teamCard.ts';

export const drawSetupInterface = (teams) => {
  const setupHtml = setup.html();
  $('.hs-main').html(setupHtml);
  for(let i = 0; i < teams.length; i++) {
    const teamName = teams[i].name;
    $('#rowTeamCard').append(teamCard.html({teamName}));
    teams[i].players.forEach(elem => {
      const markup = `<li>${elem}</li`;
      console.log('players:')
      console.log(elem);
      $(`#card${teams[i].name} .playerList`).append(markup);
    });
  }
}
