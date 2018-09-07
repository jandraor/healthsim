import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-social/bootstrap-social.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css';
import '../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import * as d3 from 'd3';
import 'bootstrap';
import * as templates from './templates/templates.ts';
import * as interfaces from './interfaces/interfaces.ts';
import './css/styles.css';

/**
* Convenience method to fetch and decode JSON.
*/
const fetchJSON = async (url, method = 'GET') => {
try {
  const response = await fetch(url, {method, credentials: 'same-origin'});
  return response.json();
} catch (error) {
  return {error};
}
};

const getAvailableModels = async () => {
  const models = await fetchJSON('/model-info/available');
  if (models.error) {
    throw models.error;
  }
  return models;
};

const listAvailableModels = models => {
  const mainElement = document.body.querySelector('.hs-main');
  mainElement.innerHTML = templates.availableModelsLayout();
  const length = models.length;
  console.log(models[0].model_name);
  const rowElement = document.body.querySelector('.row');

  for (let i = 0; i < length; i++) {
    let model_id = models[i].model_id;
    let title = models[i].model_name;
    console.log("this is i: " + i);
    let html = templates.modelCard({model_id, title});
    rowElement.insertAdjacentHTML('beforeend', html);
  }
};

const drawInterface = (modelId, modelName) => {
  templates.getTemplate(modelId, modelName);
  interfaces.getContent(modelId, fetchJSON);
};

/**
 * Show an alert to the user.
 */
const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.hs-alerts');
  const html = templates.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};

/**
 * Use Window location hash to show the specified view.
 */
const showView = async() => {
  const mainElement = document.body.querySelector('.hs-main');
  const [view, ...params] = window.location.hash.split('/');
  console.log("This is the view: " + view);

  switch(view) {
    case '#welcome':
      const session = await fetchJSON('/api/session');
      mainElement.innerHTML = templates.welcome({session});

      if (session.error) {
        showAlert(session.error);
      }
      break;

    case '#explore':
      try {
        const availableModels = await getAvailableModels();
        console.log(availableModels);
        listAvailableModels(availableModels);
      } catch (err) {
        showAlert(err);
        window.location.hash = '#welcome';
      }
      break;

    case '#interface':
      const modelId = params;
      const result_query = await fetchJSON('/model-info/model_name/' + modelId);
      const modelName = result_query[0].model_name;
      drawInterface(modelId, modelName);
      break;

    default:
      // Unrecognised view.
      throw Error(`Unrecognised view: ${view}`);
    }
  };

// Page setup.
(async () => {
  const session = await fetchJSON('/api/session');
  document.body.innerHTML = templates.main({session});
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#welcome');
})();
