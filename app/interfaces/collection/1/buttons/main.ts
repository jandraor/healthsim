import * as runButton from './run.ts';
import * as stepButton from './step.ts';
import * as replayButton from './replay.ts';
import * as drawCSButton from './drawCS.ts';
import * as resetButton from './reset.ts';

export const clickEvents = (model_id, fetchJSON, dataset) => {
  runButton.onClick(model_id, fetchJSON);
  stepButton.onClick(model_id, fetchJSON);
  replayButton.onClick();
  drawCSButton.onClick(dataset);
  resetButton.onClick();
}
