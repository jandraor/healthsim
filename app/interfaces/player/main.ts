const $ = require('jquery');
import * as timers from "./timers.ts";
import * as dashboard from './dashboard/main.ts';
import * as inputBoard from './inputBoard/main.ts';


export const buildGameInterface = (socket, initParams) => {
  timers.start();
  inputBoard.build(socket, initParams);
  dashboard.build(initParams);
}

export const disableSimButton = () => {
  $('#bSbmtDcsns').prop('disabled', true);
}

export const updateOnResults = simulationResult => {
  dashboard.update(simulationResult);
}

export const startNewRound = () => {
  timers.stop();
  timers.start();
  inputBoard.newRound();
}
