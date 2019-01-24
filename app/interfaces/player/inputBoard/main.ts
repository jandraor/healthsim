import * as sliders from './sliders/main.ts';
import * as buttons from './buttons/main.ts';

export const newRound = () => {
  buttons.submitDecisions.enable();
}

export const build = (socket, initParams) => {
  sliders.build(initParams);
  buttons.clickEvents(socket);
}
