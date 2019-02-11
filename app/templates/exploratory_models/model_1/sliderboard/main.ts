const $ = require('jquery');
import * as layout from './layout.ts';
import * as slTemplate from './sliderTemplate.ts';

export const build = () => {
  $('#divSliders').html(layout.html());
  const totalPop = $('#varValueTotalPop').text();
  const data = [
    {
      'id': 'Infected',
      'label': 'Infected [People]:',
      'min': 0,
      'max': totalPop,
      'init': String(parseFloat(totalPop) / 100),
      'step': String(parseFloat(totalPop) / 100),
    },
    {
      'id': 'ContactRate',
      'label': 'Contact rate [People per person per day]:',
      'min': 0,
      'max': 100,
      'step': 1,
      'init': 8,

    },
    {
      'id': 'Infectivity',
      'label': 'Infectivity [%]:',
      'min': 0,
      'max': 1,
      'init': 0.25,
      'step': 0.05,
    },
    {
      'id': 'RecoveryDelay',
      'label': 'Time to recover [days]:',
      'min': 0,
      'max': 100,
      'init': 2,
      'step': 1,
    },
  ]
  data.forEach(params => {
    const slHtml = slTemplate.html({params});
    $(`#div${params.id}`).html(slHtml);
  });
}
