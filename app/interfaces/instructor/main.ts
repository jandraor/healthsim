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
  'update': payload => {
    ctrlInt.update(payload);
  },
  'updateDecisions': payload => {
    ctrlInt.updateDecisions(payload);
  },
  'startNewRound': () => {
    ctrlInt.startNewRound();
  }
}
