const $ = require('jquery');
import * as layout from './layout.ts';
import * as prgBar from './progressBar.ts';
import * as conBut from './controlButtons.ts';
import * as tblTms from './teams.ts';
import * as rowTms from './teamRow.ts';
import * as chat from './chat.ts';
import * as incMssg from './incomingMessage.ts';
import * as outMssg from './outgoingMessage.ts';
import * as dashboard from './dashboard.ts';

export const build = (payload) => {
  const stopTime = payload.rounds;
  const teams = payload.teams
  const layoutHtml = layout.html({stopTime});
  $('body').html(layoutHtml);
  const progressBarHtml = prgBar.html();
  $('#divProgress').html(progressBarHtml);
  const controlButtonsHtml = conBut.html();
  $('#divControlButtons').html(controlButtonsHtml);
  const tableTeamsHtml = tblTms.html();
  $('#divTeams').html(tableTeamsHtml);
  teams.map(teamName => {
    const rowTeamHtml = rowTms.html({teamName});
    $('.tblTeams').append(rowTeamHtml);
  });
  const dashboardHtml = dashboard.html();
  $('#dashboard').append(dashboardHtml);
  const chatHtml = chat.html();
  $('.instructorChat').html(chatHtml);

}

export const addMessage = (message) => {
  const author = message.author;
  const messageText = message.text;
  const identity = $('#bSendMessage').data().team;
  const self = (author === identity) ? true : false;
  let messageHtml;
  if(self){
    messageHtml = outMssg.html({author, messageText});
  } else {
    messageHtml = incMssg.html({author, messageText});
  }
  $('#divChatBoard').append(messageHtml);
}
