import * as newRoundButton from './newRound.ts'
import * as simulateButton from './simulate.ts'

export const clickEvents = socket => {
  newRoundButton.onClick(socket);
  simulateButton.onClick(socket);
}

export const newRound = {
  'enable': () => {
    newRoundButton.enable();
  },
}

export const simulate = {
  'enable': () => {
    simulateButton.enable();
  }
}
