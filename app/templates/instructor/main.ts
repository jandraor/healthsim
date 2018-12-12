const $ = require('jquery');
import * as setup from './setup.ts';
import * as teamCard from './teamCard.ts';
import * as controlInterface from './control_interface/main.ts'
import * as incMssg from './control_interface/incomingMessage.ts'; //must change
import * as outMssg from './control_interface/outgoingMessage.ts'; //must change

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
      $(`#playerList-${teams[i].name}`).append(markup);
    });
  }
}

export const drawControlInterface = (teams) => {
  controlInterface.build(teams);
}

export const addMessage = (message) => {
  const author = message.author;
  const messageText = message.text;
  const identity = $('#bSendMessage').data().team;
  const self = (author === identity) ? true : false;
  console.log(`self: ${self}`);
  let messageHtml;
  if(self){
    messageHtml = incMssg.html({author, messageText}); //must change
  } else {
    messageHtml = incMssg.html({author, messageText});
  }


  console.log(messageHtml);
  $('#divChatBoard').append(messageHtml);
}

export const addPlayer = (payload) => {
  const team = payload.team;
  const player = payload.player;
  const markup = `<li>${player}</li`;
  $(`#playerList-${team}`).append(markup)
}
