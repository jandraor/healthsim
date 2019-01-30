import * as domEvents from './events.ts';
const $ = require('jquery');
import * as dashboard from './dashboard.ts';
import * as chatboard from './chatboard.ts';
import * as decisions from './decisions.ts';
import * as buttons from './buttons/main.ts';

export const build = (socket, payload) => {
  buttons.clickEvents(socket);
  domEvents.clickSendMessage(socket);
  domEvents.pressAnyKey();
  const identity = {'team': 'instructor'}
  $('#bSendMessage').data(identity);
  dashboard.build(payload);
}

export const updateOnSimulation = results => {
  dashboard.update(results);
  buttons.newRound.enable();
}

export const updateDecisions = payload => {
  decisions.update(payload);
}

export const startNewRound = () => {
  //Reset timer
  //Set all status of players to pending decisions(crosses) & let empty its data
  $('.icnDecisions').each(function() {
    $(this).removeData();
    $(this).attr('class', 'fas fa-times icnDecisions');
  });
  //Change indicator of current round
  const currentRound = parseInt($('#lCurrentRound').text());
  const newRound = currentRound + 1;
  $('#lCurrentRound').text(newRound);
  buttons.simulate.enable();
}

export const updateOnNewMessage = () => {
  chatboard.newMessage();
}
