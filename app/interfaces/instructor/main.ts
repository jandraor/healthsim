const $ = require('jquery');
import * as gameEvents from '../../game_events/main.ts';
import * as setupScreen from './setupInterface/main.ts';
import * as controlScreen from './controlInterface/main.ts';

export const build = {
  'setupScreen':  (socket) => {
    setupScreen.build(socket);
  },
  'controlScreen': (socket) => {
    controlScreen.build(socket);
  }
}
