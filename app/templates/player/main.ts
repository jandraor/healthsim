const $ = require('jquery');
import * as wtng from './waiting.ts'
import * as gameInterface from './game_interface/main.ts'
import * as mssg from './message.ts';


export const drawWaitingInterface = () => {
  const waitingHtml = wtng.html();
  $('.hs-main').html(waitingHtml);
}

export const drawGameInterface = params => {
  gameInterface.build(params);
}

export const addMessage = message => {
  gameInterface.addMessage(message);
}
