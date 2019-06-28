import * as cld from '../../components/cld.ts';

export const build = () => {
  cld.drawCLD('feedbackLoopDiagram');
  cld.addFLSymbol({
    'svgId': 'svgCLD',
    'xPos': 60,
    'yPos': 120,
    'name': 'B1',
    'counterclockwise': false
  })

  cld.addFLSymbol({
    'svgId': 'svgCLD',
    'xPos': 135,
    'yPos': 120,
    'name': 'R1',
    'counterclockwise': true
  })

  cld.addFLSymbol({
    'svgId': 'svgCLD',
    'xPos': 190,
    'yPos': 160,
    'name': 'B2',
    'counterclockwise': false
  })
}
