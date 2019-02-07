import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <table class = "tblTeams">
    <thead class = "text-secondary">
      <tr class = "font-weight-bold">
        <td class = "text-center">Status</td>
        <td>Team</td>
        <td>Population</td>
        <td>Income level</td>
      </tr>
    </thead>
  </table>
`);
