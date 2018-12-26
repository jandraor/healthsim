import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <tr>
    <td class = "py-2 tdTeamName" id = 'tdTeamName{{teamName}}'>{{teamName}}</td>
    <td class = "py-2 d-flex justify-content-center">
      <span class="fas fa-times" id = "icnDes{{teamName}}"></span>
    </td>
  </tr>
`);
