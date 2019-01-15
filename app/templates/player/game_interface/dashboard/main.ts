const $ = require('jquery');
import * as teamInfo from './teamInfo.ts';
import * as layout from './layout.ts';

export const build = myTeam => {
  const dashboard = $('#divDashboard');
  const layoutHtml = layout.html();
  dashboard.append(layoutHtml);
  const teamInfoHtml = teamInfo.html({myTeam})
  $('#divTeamInfo').html(teamInfoHtml);
}
