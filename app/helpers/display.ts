import * as ut from '../helpers/utilities.ts';
import * as templates from '../templates/templates.ts';
import * as sckt from '../sockets/sockets.ts';
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

export const listPlayOptions = async(socket) => {
  try {
    const session = await ut.fetchJSON('/api/session');
      if(!session.auth) {
        throw `You must sign in to use this service`;
      }
    const response = await ut.fetchJSON('/api/instructor');
    const is_Instructor = response.value;
    console.log(is_Instructor);
    const mainElement = $('.hs-main');
    const html = templates.roleLayout({is_Instructor})
    mainElement.html(html);
    $('#bCreateGame').click( () => {
      sckt.sendGame(socket);
    });
  } catch(err) {
    ut.showAlert(err);
    window.location.hash = '#welcome';
  }
};
