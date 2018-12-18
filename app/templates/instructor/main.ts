const $ = require('jquery');
import * as stpInt from './setup_interface/main.ts';
import * as ctrlInt from './control_interface/main.ts';

export const controlInterface = {
  'build': teams => {
    ctrlInt.build(teams);
  },
  'addMessage': payload => {
    ctrlInt.addMessage(payload)
  }
}

export const setupInterface = {
  'build': teams => {
    stpInt.build(teams);
  },
  'addPlayer': payload => {
    stpInt.addPlayer(payload);
  }
}
