import * as arcMeter from '../../components/arcMeter.ts';

export const build = () => {
  arcMeter.initialise({
    'svg': 'svgInfectedPct',
    'height': 100,
    'width': 100,
  });
}
