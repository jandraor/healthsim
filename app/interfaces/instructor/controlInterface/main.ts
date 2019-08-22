import * as domEvents from './events.ts';
const $ = require('jquery');
import * as dashboard from './dashboard/main.ts';
import * as chatboard from './chatboard.ts';
import * as decisions from './decisions.ts';
import * as controlboard from './controlboard/main.ts';
import * as gameEvents from '../../../game_events/main.ts';

export const build = (socket, payload) => {
  const virusSeverity = payload.virusSeverity;
  controlboard.build(socket, virusSeverity);
  domEvents.clickSendMessage(socket);
  domEvents.pressAnyKey();
  const identity = {'team': 'instructor'}
  $('#bSendMessage').data(identity);
  dashboard.build(payload);

  const message = {
    'text': 'The game has started'
  }
  gameEvents.instructorEmitters.sendMessage(socket, message);
}

export const updateOnSimulation = (results, socket) => {
  dashboard.update(results);
  const stopTime = parseInt($('#lStopTime').text());
  const currentRound = parseInt($('#lCurrentRound').text());
  if(currentRound < stopTime){
    controlboard.newRoundBtn.enable();
  }

  if(currentRound >= stopTime) {
    controlboard.gameOver();
    controlboard.newRoundBtn.dim();
    controlboard.simulateBtn.dim();
    controlboard.resultsBtn.light();
    controlboard.resultsBtn.enable();
  }

  const message = {
    'text': 'Dashboards updated with simulation results'
  }

  gameEvents.instructorEmitters.sendMessage(socket, message);
}

export const updateDecisions = payload => {
  decisions.update(payload);
}

export const startNewRound = socket => {
  const message = {
    'text': 'A new round has started'
  }

  gameEvents.instructorEmitters.sendMessage(socket, message);

  //Set all status of players to pending decisions(crosses) & let empty its data
  $('.icnDecisions').each(function() {
    $(this).removeData();
    $(this).attr('class', 'fas fa-times icnDecisions');
  });
  //Change indicator of current round
  const currentRound = parseInt($('#lCurrentRound').text());
  const newRound = currentRound + 1;
  $('#lCurrentRound').text(newRound);
  controlboard.simulateBtn.enable();
}

export const updateOnNewMessage = () => {
  chatboard.newMessage();
}

export const estimateFinalScores = (socket, payload) => {
  controlboard.resultsBtn.dim();
  dashboard.displayFinalScores(payload);
}
