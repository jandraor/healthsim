import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-4 ml-4" id = "divTableSLScores">
    <table id = "tblSLScores">
      <thead>
        <tr class = "border-bottom">
          <th> <small>Team</small> </th>
          <th class = "pl-3"> <small>Behaviour over time</small> </th>
          <th> <small>Loss</small> </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
`);
