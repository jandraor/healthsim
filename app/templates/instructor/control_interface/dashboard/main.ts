import * as layout from './layout.ts';
import * as epidemics from './epidemics.ts';
import * as donations from './donations.ts';
import * as inventories from './inventories.ts';
import * as queries from "../../../../interfaces/player/objectQueries.ts";
import * as templateUtils from "../../../helpers/utils.ts";
import * as scores from './scores.ts';
const $ = require('jquery');

export const build = () => {
  addLayout();
  addEpidemics();
  addInventories();
  addDonations();
  addScores();
}

const addLayout = () => {
  const layoutHtml = layout.html();
  $('#divDashboard').append(layoutHtml);
}

const addEpidemics = () => {
  const epidemicsHtml = epidemics.html();
  $('#divEpi').append(epidemicsHtml);
}

const addDonations = () => {
  const donationsHtml = donations.html();
  $('#divDon').append(donationsHtml);
  const sectionObject = queries.getSectionObject('Resources');

  const items = sectionObject.variables.map(resource => {
    const variableObject = {
      'value': resource.id,
      'text': resource.display
    }
    return variableObject
  });

  const params = {
    'items': items,
    'selectId': 'selRelRes'
  }
  templateUtils.addOptions(params);
}

const addInventories = () => {
  const inventoriesHtml = inventories.html();
  $('#divInv').append(inventoriesHtml);
}

const addScores = () => {
  const scoresHtml = scores.html();
  $('#divScr').append(scoresHtml)
}
