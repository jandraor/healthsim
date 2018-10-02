import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-social/bootstrap-social.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css';
import '../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import * as d3 from 'd3';
import 'bootstrap';
import * as templates from './templates/templates.ts';
import * as interfaces from './interfaces/interfaces.ts';
import * as ut from './helpers/utilities.ts';
import './css/styles.css';

const getAvailableModels = async () => {
  const models = await ut.fetchJSON('/model-info/available');
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
    const model_id = models[i].model_id;
    const title = models[i].model_name;
    const description = models[i].description;
    console.log(description);
    console.log("this is i: " + i);
    const html = templates.modelCard({model_id, title, description});
    rowElement.insertAdjacentHTML('beforeend', html);
  }
};

const drawInterface = (modelId, modelName) => {
  templates.getTemplate(modelId, modelName);
  interfaces.getContent(modelId, ut.fetchJSON);
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
      const session = await ut.fetchJSON('/api/session');
      mainElement.innerHTML = templates.welcome({session});

      if (session.error) {
        showAlert(session.error);
      }
      break;

    case '#explore':
      try {
        if(params[0] === 'r'){ //reconstruct
          const session = await ut.fetchJSON('/api/session');
          document.body.innerHTML = templates.main({session});
        }
        const availableModels = await getAvailableModels();
        listAvailableModels(availableModels);
      } catch (err) {
        showAlert(err);
        window.location.hash = '#welcome';
      }
      break;

    case '#interface':
      const modelId = params;
      const result_query = await ut.fetchJSON('/model-info/model_name/' + modelId);
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
  const session = await ut.fetchJSON('/api/session');
  document.body.innerHTML = templates.main({session});
  window.addEventListener('hashchange', showView);
  showView().catch(err => window.location.hash = '#welcome');
})();
