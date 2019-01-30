import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "divTeamInfo"> </div>
  <div class = "text-secondary" id = "divRounds"></div>
  <div class = "row border rounded" id = "divInfected">
    <div class = "col-5" id = "divTSInfected">
      <div class = "my-1" id = "divSelInfected">
        <select id = "selTSInfected" class = "selectpicker selDashboard show-tick" data-width="fit">
        </select>
      </div>
      <div id = "divSVGInfected"  class = "pt-2 pl-0">
        <svg id = "svgTSInfected"></svg>
      </div>
    </div>
    <div class = "col-4 " id = "divSLInfected">
      <div class = "mt-3" id = "divTableSLInfected">
        <table id = "tblSLInfected">
          <thead>
            <tr class = "border-bottom">
              <th> <small>Key metrics</small> </th>
              <th> <small>Behaviour over time</small> </th>
              <th> <small>Current</small> </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
  <div class = "row border rounded"  id = "divResources">
    <div class = "col-5" id = "divTSResources">
      <div class = "my-1" id = "divSelResources">
        <select id = "selTSResources" class = "selDashboard selectpicker show-tick" data-width="fit">
        </select>
      </div>
      <div class = "pt-2 pl-0">
        <svg id = "svgTSResources"></svg>
      </div>
    </div>
    <div class = "col-4 " id = "divSLResources">
      <div class = "mt-4" id = "divTableSLResources">
        <table id = "tblSLResources">
          <thead>
            <tr class = "border-bottom">
              <th> <small>Resources</small> </th>
              <th> <small>Behaviour over time</small> </th>
              <th> <small>Current</small> </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
`);
