import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <p class = "text-secondary">Team:
    <span class = "text-dark" id = "lTeamId">{{myTeam}}</span>
  </p>
`);
