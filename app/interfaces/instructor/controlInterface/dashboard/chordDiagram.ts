import * as chord from '../../../components/chord.ts';
export const update = data => {
  chord.draw({
    'svgId': 'svgChordDon',
    'dataset': data.antivirals,
    'labels': data.names_order,
  })
}
