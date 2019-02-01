import * as layout from './layout.ts';
import * as epidemics from './epidemics.ts';
import * as donations from './donations.ts';
const $ = require('jquery');

export const build = () => {
  const layoutHtml = layout.html();
  $('#divDashboard').append(layoutHtml);
  const epidemicsHtml = epidemics.html();
  $('#divEpi').append(epidemicsHtml);
  const donationsHtml = donations.html();
  $('#divDon').append(donationsHtml);
}
