const $ = require('jquery');

export const build = myTeam => {
  const HtmlMarkup = `
    <p class = "text-secondary">Team:
      <span class = "text-dark"  id = "lTeamId">${myTeam}</span>
    </p>`
  $('#divDashboard').html(HtmlMarkup);
}
