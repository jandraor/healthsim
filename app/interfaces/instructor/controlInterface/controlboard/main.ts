import * as buttons from './buttons/main.ts';
import * as timer from './timer.ts'

export const build = socket => {
  buttons.clickEvents(socket);
  timer.start();
}

export const newRoundBtn = {
  'enable': () => {
    buttons.newRound.enable();
  }
}

export const simulateBtn = {
  'enable': () => {
    buttons.simulate.enable();
  }
}
