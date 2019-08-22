import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-3">
        <div id = "divProgress"></div>
        <div id = "divControlboard"></div>
        <div id = "divData">
          <label class = "d-none" id = "lVirusSeverity"></label>
        </div>
      </div>
      <div class = "col-9 instructorRightCol">
        <div class = "py-0 my-0 h-75" id = "divDashboard"></div>
        <div class = "border round py-0 my-0 instructorChat h-25"></div>
      </div>
    </div>
  </div>
`);
