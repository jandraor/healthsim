import * as ut from '../helpers/utilities.ts';
import * as templates from '../templates/main.ts';
import * as gameEvents from '../game_events/main.ts';
const $ = require('jquery');

export const listAvailableModels = (templates, models) => {
  const mainElement = document.body.querySelector('.hs-main');
  mainElement.innerHTML = templates.availableModelsLayout();
  const length = models.length;
  const rowElement = document.body.querySelector('.row');

  for (let i = 0; i < length; i++) {
    const model_id = models[i].model_id;
    const title = models[i].model_name;
    const description = models[i].description;
    const html = templates.modelCard({model_id, title, description});
    rowElement.insertAdjacentHTML('beforeend', html);
  }
};
