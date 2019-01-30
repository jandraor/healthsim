import * as layout from './layout.ts';
import * as outMssg from './outgoingMessage.ts';
import * as incMssg from './incomingMessage.ts';
import * as ut from "../../../../helpers/utilities.ts";
const $ = require('jquery');

export const build = () => {
  const chat = $('#divChat');
  const layoutHtml = layout.html();
  chat.append(layoutHtml);
}

export const addMessage = message => {
  const author = message.author;
  const messageText = message.text;
  const identity = $('#lTeamId').text();
  const self = (author === identity) ? true : false;
  let messageHtml;
  const date = new Date();
  const month = date.toLocaleString('en-us', { month: 'long' });
  const day = date.getDate();
  const time = ut.formatToChatTime(date);
  console.log(`day: ${day}`);
  if(self){
    messageHtml = outMssg.html({author, messageText, month, day, time});
  } else {
    const teamLogo = require(`../../../../img/teams/${author}.svg`)
    messageHtml = incMssg.html({author, messageText, teamLogo, month, day, time});
  }
  $('#divChatBoard').append(messageHtml);
}
