import * as heatmap from './heatmap.ts';
import * as chord from './chordDiagram.ts';

export const build = options => {
  heatmap.build(options);
  chord.build();
}

export const update = newData => {
  heatmap.update(newData);
}
