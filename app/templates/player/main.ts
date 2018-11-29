const $ = require('jquery');
import * as wtng from './waiting.ts'
import * as gameInterface from './gameInterface.ts'
import * as mssg from './message.ts';

export const drawWaitingInterface = () => {
  const waitingHtml = wtng.html();
  $('.hs-main').html(waitingHtml);
}

export const drawGameInterface = () => {
  const gamInterfaceHtml = gameInterface.html();
  $('.hs-main').html(gamInterfaceHtml);
}

export const addMessage = (message) => {
  const author = message.author;
  const messageText = message.text;
  const messageHtml = mssg.html({author, messageText});
  console.log(messageHtml);
  $('#divChatBoard').append(messageHtml);
}
