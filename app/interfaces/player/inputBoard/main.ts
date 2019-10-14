import * as sliders from './sliders/main.ts';
import * as buttons from './buttons/main.ts';
import * as indicators from './indicators.ts'

export const newRound = () => {
  buttons.submitDecisions.enable();
}

export const build = (socket, initParams) => {
  sliders.build(initParams);
  buttons.clickEvents(socket);
}

export const update = simulationResult => {
  buttons.submitDecisions.disable();
  const lastRow = simulationResult[simulationResult.length - 1];
  indicators.updateStocks(lastRow);
  indicators.updateResourcesOnTransit(lastRow);
  sliders.setMaxLimits(lastRow);
}
