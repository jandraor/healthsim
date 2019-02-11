import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <!-- First group of parameters-->
  <div id ="firstGroupPar" class = "d-block ml-3">
    <div class = "d-inline-block divPar" id = "divInfected"></div>
    <div class = "d-inline-block divPar" id = "divContactRate"></div>
  </div>

  <!-- Second group of parameters -->
  <div id ="secondGroupPar" class = "d-block ml-3">
    <div class = "d-inline-block divPar" id = "divInfectivity"></div>
    <div class = "d-inline-block divPar" id = "divRecoveryDelay"></div>
  </div>
`);
