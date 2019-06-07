const $ = require('jquery');
import * as gameEvents from '../../game_events/main.ts';
import * as stpInt from './setupInterface/main.ts';
import * as ctrlInt from './controlInterface/main.ts';

export const setupInterface = {
  'build':  (socket) => {
    stpInt.build(socket);
  },
}

export const controlInterface = {
  'build': (socket, payload)=> {
    ctrlInt.build(socket, payload);
  },
  'updateOnSimulation': (payload, socket) => {
    ctrlInt.updateOnSimulation(payload, socket);
  },
  'updateDecisions': payload => {
    ctrlInt.updateDecisions(payload);
  },
  'startNewRound': socket => {
    ctrlInt.startNewRound(socket);
  },
  'updateOnNewMessage': () => {
    ctrlInt.updateOnNewMessage();
  }
}
