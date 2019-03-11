const $ = require('jquery');

export const getTeams = () => {
  const teams = [];
  $('.tdTeamName').each(function() {
    const team = this.id.replace('tdTeamName', '');
    teams.push(team);
  })
  return teams;
}
