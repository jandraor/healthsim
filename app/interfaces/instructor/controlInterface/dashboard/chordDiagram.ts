import * as chord from '../../../components/chord.ts';
export const build = () => {
  const data = [
    [0, 10, 5, 0],
    [15, 0, 0, 10],
    [20, 0, 0 , 15],
    [5, 30, 0, 0]
  ]

  chord.draw({'svgId': 'svgChordDon', 'dataset': data})
}
