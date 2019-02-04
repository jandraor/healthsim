import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';

export const build = options => {
  heatmap.build(options);
}

export const update = resultObj => {
  heatmap.update(resultObj.bot);
  chord.update(resultObj.donations);
}
