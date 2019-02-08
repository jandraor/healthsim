import * as chord from '../../../components/chord.ts';

const svgId = 'svgChordDon';

export const update = (data, labels) => {
  chord.clear(svgId)
  chord.draw({
    'svgId': svgId,
    'dataset': data,
    'labels': labels,
  })
}

export const build = () => {
  chord.chart({
    'svgId': svgId,
    'width': 490,
    'height': 490,
  })
}

export const empty = () => {
  chord.clear(svgId)
  chord.empty(svgId, 'No donations given')
}
