const $ = require('jquery');
import * as bullet from '../../components/bullet.ts';
import * as help from './helpers/main.ts';
import * as ut from '../../../helpers/utilities.ts';

export const build = () => {
  bullet.draw({
    'svgId': 'svgEconPerf',
    'title': 'Economic loss',
    'subtitle': '$',
    'ranges': [0, 0, 0],
    'measure': 0,
    'reverse': true,
  })
}

export const update = result => {
  const team = $('#lTeamId').text();
  const yVariable = `${team}_FM_CDL`;
  const dataset = ut.create2DDataset('time', yVariable, result);
  const delayedResult = help.delayDataset(dataset);

  if(delayedResult.length > 0) {
    bullet.clear('svgEconPerf');
    const lastRow = delayedResult[delayedResult.length - 1];
    const measure = lastRow.y

    bullet.draw({
      'svgId': 'svgEconPerf',
      'title': 'Economic loss',
      'subtitle': '$',
      'ranges': [100e6, 50e6, 21e6],
      'measure': measure,
      'reverse': true,
    });
  }
}
