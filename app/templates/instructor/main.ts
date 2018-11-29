const $ = require('jquery');
import * as setup from './setup.ts';
import * as teamCard from './teamCard.ts';
import * as ctrlIntrf from './controlInterface.ts';
import * as mssg from './message.ts';

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

export const drawControlInterface = () => {
  const controlInterfaceHTML = ctrlIntrf.html();
  $('.hs-main').html(controlInterfaceHTML);
}

export const addMessage = (message) => {
  const author = message.author;
  const messageText = message.text;
  const messageHtml = mssg.html({author, messageText});
  console.log(messageHtml);
  $('#divChatBoard').append(messageHtml);
}
