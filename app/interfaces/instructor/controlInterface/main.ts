import * as domEvents from './events.ts';
const $ = require('jquery');

export const build = (socket) => {
  domEvents.clickSimulate(socket);
  domEvents.clickSendMessage(socket);
  domEvents.pressAnyKey();
  const identity = {'team': 'instructor'}
  $('#bSendMessage').data(identity);
}
