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
              <div class = "col-6" id = "divDeploy">
                <h4 class = "mt-2">Fight the disease</h4>
              </div>
              <div class = "col-6" id = "divFinance">
                <h4 class = "mt-2">Manage the supply line</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class = "col-8 playerRightCol">
        <div class = "container-fluid h-75" id = 'divDashboard'></div>
        <div class = "container-fluid h-25 border rounded">
          <div class = "row h-100">
            <div class = "col-9 h-100" id = "divChat"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`);
