const $ = require('jquery');
import * as layout from './layout.ts';
import * as ctrl from './controls.ts';
import * as inputs from './inputs.ts';
import * as scenarios from './scenarios.ts';
import * as compCont from './complementary_content/main.ts'

export const drawLayout = (modelName) => {
  $('body').html(layout.html({modelName}));
  $('#divControls').append(ctrl.buttons());
  const totalPop = $('#varValueTotalPop').text();
  const initial = String(parseFloat(totalPop) / 100);
  const step = String(parseFloat(totalPop) / 100);
  $('#divSliders').html(inputs.parameters({totalPop, initial, step}));
  compCont.buildLayout('why');
  $('#divSimulations').html(scenarios.html())
}
