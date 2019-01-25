import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <span>Round:</span>
  <span class = 'text-dark' id = 'lCurrentRound'>1</span>
  of
  <span id = "lStopTime">{{stopTime}} </label>
`);
