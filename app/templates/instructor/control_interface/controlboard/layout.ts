import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "divControlButtons" class = "d-block my-3"></div>
  <div class = "my-3 text-secondary">
    <span>Round:</span>
    <span class = 'text-dark' id = 'lCurrentRound'>0</span>
    of
    <span id = "lStopTime">{{stopTime}} </label>
  </div>
  <div id = 'divTeams'></div>
`);
