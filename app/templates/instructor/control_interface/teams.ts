import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <table class = "tblTeams">
    <thead class = "text-secondary">
      <tr>
        <td>Team</td>
        <td class = "text-center">Status</td>
      </tr>
    </thead>
  </table>
`);
