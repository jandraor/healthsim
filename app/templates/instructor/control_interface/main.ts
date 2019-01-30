const $ = require('jquery');
import * as layout from './layout.ts';
import * as prgBar from './progressBar.ts';
import * as conBut from './controlButtons.ts';
import * as tblTms from './teams.ts';
import * as rowTms from './teamRow.ts';
import * as chat from './chat.ts';
import * as incMssg from './incomingMessage.ts';
import * as outMssg from './outgoingMessage.ts';
import * as dashboard from './dashboard/main.ts';
import * as ut from '../../../helpers/utilities.ts'

export const build = payload => {
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
  dashboard.build();
  const chatHtml = chat.html();
  $('.instructorChat').html(chatHtml);
}

export const addMessage = message => {
  const author = message.author;
  console.log(author);
  console.log(author);
  const messageText = message.text;
  const identity = $('#bSendMessage').data().team;
  const self = (author === identity) ? true : false;
  let messageHtml;
  const date = new Date();
  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.getDate();
  const time = ut.formatToChatTime(date);
  if(self){
    messageHtml = outMssg.html({author, messageText, month, day, time});
  } else {
    const teamLogo = require(`../../../img/teams/${author}.svg`)
    messageHtml = incMssg.html({author, messageText, teamLogo, month, day, time});
  }
  $('#divChatBoard').append(messageHtml);
}
