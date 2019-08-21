import * as buttons from './buttons/main.ts';
import * as timer from './timer.ts'

export const build = socket => {
  buttons.clickEvents(socket);
}

export const newRoundBtn = {
  'enable': () => {
    buttons.newRound.enable();
  },
  'dim': () => {
    buttons.newRound.dim();
  }
}

export const simulateBtn = {
  'enable': () => {
    buttons.simulate.enable();
  },
  'dim': () => {
    buttons.simulate.dim();
  }
}

export const resultsBtn = {
  'dim': () => {
    buttons.results.dim();
  },
  'enable': () => {
    buttons.results.enable();
  },
  'light': () => {
    buttons.results.light();
  }
}

export const gameOver = () => {
  timer.gameOver();
}
