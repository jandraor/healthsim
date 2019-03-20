import * as bullet from '../../components/bullet.ts';

export const build = () => {
  bullet.draw({
    'svgId': 'svgEconPerf',
    'title': 'Economic loss',
    'subtitle': '$',
    'ranges': [100, 75, 25],
    'measure': 66,
    'reverse': true,
  })
}
