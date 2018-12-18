import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-3">
        <div id = "divProgress"></div>
        <div id = "divSimulateButton" class = "d-block my-3"></div>
        <div class = "my-3">
          <span class = "text-secondary">Round:</span>
          <span id = 'roundNumber'>1</span>
          of
          <label id = "lStopTime">20 </label>
        </div>
        <div id = 'divTeams'></div>
      </div>
      <div class = "col-9 instructorRightCol border">
        <div class = "py-0 my-0 border h-75" id = "dashboard"></div>
        <div class = "border py-0 my-0 instructorChat h-25"></div>
      </div>
    </div>
  </div>
`);
