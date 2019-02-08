import * as barchart from '../../../components/barchart.ts';
import * as ut from '../../../../helpers/utilities.ts'

const svgId = "svgBarChartTopDon";

export const build = () => {
  barchart.chart({
    'svgId': svgId,
    'width': 490,
    'height': 490,
  });
}

export const update = (oneResourceDonations, colnames) => {
  const sumCol = ut.sumCols(oneResourceDonations, colnames);
  const data = sumCol.filter(elem => elem.y > 0)
  const sortedData = ut.sortObjArray(data, 'y');
  barchart.clear(svgId);
  barchart.draw(
    {
      'svgId': svgId,
      'data': data,
});
}

export const empty = () => {
  barchart.clear(svgId)
  barchart.empty(svgId, 'No donations given')
}
