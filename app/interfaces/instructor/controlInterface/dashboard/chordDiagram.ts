import * as chord from '../../../components/chord.ts';

export const update = (data, labels) => {
  const svgId = 'svgChordDon';
  chord.clear(svgId)
  chord.draw({
    'svgId': svgId,
    'dataset': data,
    'labels': labels,
  })
}
