import * as ut from '../helpers/utilities.ts';

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

export const listPlayOptions = async() => {
  try {
    const session = await ut.fetchJSON('/api/session');
      if(!session.auth) {
        throw `You must sign in to use this service`;
      }
    const is_Instructor = await ut.fetchJSON('/api/instructor');
    window.alert(`Is instructor?: ${is_Instructor.value}`);
  } catch(err) {
    ut.showAlert(err);
    window.location.hash = '#welcome';
  }
};
