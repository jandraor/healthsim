import * as layout from './layout.ts';
const $ = require('jquery');

export const build = () => {
  const dashboard = $('#divDashboard');
  const layoutHtml = layout.html();
  dashboard.append(layoutHtml);
}
