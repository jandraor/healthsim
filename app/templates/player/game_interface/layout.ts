import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-4">
        <div id = "divProgress"></div>
        <div id = "divInputs">
          <div class = "container-fluid">
            <div id = "divRowIpt0"></div>
            <div class = "row">
              <div class = "col-6" id = "divDeploy"> </div>
              <div class = "col-6" id = "divFinance"> </div>
            </div>
          </div>
        </div>
      </div>
      <div class = "col-8">
        <div id = 'divDashboard'></div>
      </div>
    </div>
  </div>
`);
