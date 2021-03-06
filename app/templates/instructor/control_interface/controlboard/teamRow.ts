import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <tr>
    <td class = "py-3 d-flex justify-content-center">
      <span class="fas fa-times icnDecisions" id = "icnDes{{team.name}}"></span>
    </td>
    <td class = "py-2 tdTeamName" id = 'tdTeamName{{team.name}}'>
      <img src= {{team.logo}} height = "24" width = "24">
      <span class = "ml-1">{{team.name}}<span>
    </td>
    <td class = "text-secondary">{{team.population}}</td>
    <td class = "text-secondary">{{team.incomeLevel}}</td>
  </tr>
`);
