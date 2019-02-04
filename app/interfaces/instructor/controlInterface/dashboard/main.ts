import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';
import * as select from './select.ts';

export const build = options => {
  heatmap.build(options);
  select.build();
}

export const update = resultObj => {
  heatmap.update(resultObj.bot);
  chord.update(resultObj.donations);
}
