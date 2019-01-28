import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-3">
        <div id = "divProgress"></div>
        <div id = "divControlButtons" class = "d-block my-3"></div>
        <div class = "my-3 text-secondary">
          <span>Round:</span>
          <span class = 'text-dark' id = 'lCurrentRound'>1</span>
          of
          <span id = "lStopTime">{{stopTime}} </label>
        </div>
        <div id = 'divTeams'></div>
      </div>
      <div class = "col-9 instructorRightCol border">
        <div class = "py-0 my-0 border h-75" id = "divDashboard"></div>
        <div class = "border py-0 my-0 instructorChat h-25"></div>
      </div>
    </div>
  </div>
`);
