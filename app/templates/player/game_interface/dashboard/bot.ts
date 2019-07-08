import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
<div class = "container-fluid">
  <div class = "row border rounded" id = "divSIR">
    <div class = "col-6" id = "divTSSIR">
      <div class = "my-1" id = "divSelSIR">
        <select id = "selTSSIR" class = "selectpicker selDashboard show-tick" data-width="fit">
        </select>
      </div>
      <div id = "divSVGSIR"  class = "pt-2 pl-0">
        <svg id = "svgTSSIR"></svg>
      </div>
    </div>
    <div class = "col-6 align-self-center" id = "divSLSIR">
      <div class = "mt-3" id = "divTableSLSIR">
        <table id = "tblSIR">
          <thead>
            <tr class = "border-bottom">
              <th> <small>Key metrics</small> </th>
              <th class = "pl-3"> <small>Behaviour over time</small> </th>
              <th class = "pl-2"> <small>Last value</small> </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
  <div class = "row border rounded"  id = "divResources">
    <div class = "col-6" id = "divTSResources">
      <div class = "my-1" id = "divSelResources">
        <select id = "selTSResources" class = "selDashboard selectpicker show-tick" data-width="fit">
        </select>
      </div>
      <div class = "pt-2 pl-0">
        <svg id = "svgTSResources"></svg>
      </div>
    </div>
    <div class = "col-6 " id = "divSLResources">
      <div class = "mt-4" id = "divTableSLResources">
        <table id = "tblSLResources">
          <thead>
            <tr class = "border-bottom">
              <th> <small>Resources</small> </th>
              <th class = "pl-3"> <small>Behaviour over time</small> </th>
              <th> <small>Last value</small> </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`);
