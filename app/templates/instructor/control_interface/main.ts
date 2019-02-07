const $ = require('jquery');
import * as layout from './layout.ts';
import * as prgBar from './progressBar.ts';
import * as chat from './chat.ts';
import * as incMssg from './incomingMessage.ts';
import * as outMssg from './outgoingMessage.ts';
import * as dashboard from './dashboard/main.ts';
import * as ut from '../../../helpers/utilities.ts';
import * as controlboard from './controlboard/main.ts';

export const build = payload => {
  $('body').html(layout.html());
  const progressBarHtml = prgBar.html();
  $('#divProgress').html(progressBarHtml);
  controlboard.build(payload);
  dashboard.build();
  const chatHtml = chat.html();
  $('.instructorChat').html(chatHtml);
}

export const addMessage = message => {
  const author = message.author;
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
