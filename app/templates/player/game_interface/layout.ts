import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-5">
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
      <div class = "col-7 playerRightCol">
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
