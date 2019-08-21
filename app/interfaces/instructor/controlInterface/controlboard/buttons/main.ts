import * as newRoundButton from './newRound.ts'
import * as simulateButton from './simulate.ts'
import * as resultsButton from './results.ts';

export const clickEvents = socket => {
  newRoundButton.onClick(socket);
  simulateButton.onClick(socket);
  resultsButton.onClick(socket);
}

export const newRound = {
  'enable': () => {
    newRoundButton.enable();
  },
  'dim': () => {
    newRoundButton.dim();
  }
}

export const simulate = {
  'enable': () => {
    simulateButton.enable();
  },
  'dim': () => {
    simulateButton.dim();
  }
}

export const results = {
  'dim': () => {
    resultsButton.dim();
  },
  'enable': () => {
    resultsButton.enable();
  },
  'light': () => {
    resultsButton.light();
  }
}
