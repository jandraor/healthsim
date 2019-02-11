const $ = require('jquery');
import * as timeseries from '../timeseries.ts';
import * as sparklines from '../sparklines.ts';
import * as sliders from '../slds.ts';
import * as indicators from '../indicators.ts';
import * as selects from '../selects.ts';
import * as checkboxes from '../checkboxes.ts';
import * as tables from '../tables.ts';

export const onClick = () => {
  $('#bReset').click(() => {
    checkboxes.reset();
    indicators.reset();
    timeseries.reset();
    sparklines.reset();
    sliders.reset();
    selects.reset();
    tables.reset();
  });
}
