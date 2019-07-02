const $ = require('jquery');
import * as timers from "./timers.ts";
import * as dashboard from './dashboard/main.ts';
import * as inputBoard from './inputBoard/main.ts';
import * as chatboard from './chatboard/main.ts';


export const buildGameInterface = (socket, initParams) => {
  inputBoard.build(socket, initParams);
  dashboard.build(initParams);
  chatboard.build(socket);
}

export const disableSimButton = () => {
  $('#bSbmtDcsns').prop('disabled', true);
}

export const updateOnResults = simulationResult => {
  dashboard.update(simulationResult);
  inputBoard.update(simulationResult);
  const currentRound = parseInt($('#lCurrentRound').text());;
  const stopTime = parseInt($('#lStopTime').text());
  if(currentRound >= stopTime) {
    timers.gameOver();
  }

}

export const startNewRound = () => {
  timers.stop();
  timers.start();
  inputBoard.newRound();
  dashboard.newRound();
}

export const newMessage = () => {
  chatboard.newMessage();
}
