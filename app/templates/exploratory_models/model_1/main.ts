const $ = require('jquery');
import * as layout from './layout.ts';
import * as ctrl from './controls.ts';
import * as sliderboard from './sliderboard/main.ts';
import * as scenarios from './scenarios.ts';
import * as compCont from './complementary_content/main.ts'

export const drawLayout = (modelName) => {
  $('body').html(layout.html({modelName}));
  $('#divControls').append(ctrl.html());
  sliderboard.build();
  compCont.buildLayout('why');
  $('#divSimulations').html(scenarios.html());
}
