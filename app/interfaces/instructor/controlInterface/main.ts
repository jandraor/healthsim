import * as domEvents from './events.ts';
const $ = require('jquery');
import * as dashboard from './dashboard.ts';
import * as decisions from './decisions.ts';

export const build = (socket, payload) => {
  domEvents.clickSimulate(socket);
  domEvents.clickSendMessage(socket);
  domEvents.pressAnyKey();
  const identity = {'team': 'instructor'}
  $('#bSendMessage').data(identity);
  dashboard.build(payload);
}

export const updateDashboard = payload => {
  dashboard.update(payload);
}

export const updateDecisions = payload => {
  decisions.update(payload);
}
