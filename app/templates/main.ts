const $ = require('jquery');
import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';
const logo2 = require('../img/logo2.svg');
const saf = require('../img/unnamed.png');
const modelimg = require('../img/SIR.png');
const logoNUIG = require('../img/logo_nuig.jpg');
import * as inst from './instructor/main.ts';
import * as main from './mainLayout.ts';
import * as plyr from './player/main.ts';
import * as nav from './navigation/main.ts';

export const alert = Handlebars.compile(`
  <div class="alert alert-{{type}} alert-dismissible fade show" role="alert">
    <button class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{message}}
  </div>
`);

export const availableModelsLayout = Handlebars.compile(`
  <div class = "models py-4">
    <p class = "my-1"> SIMULATION MODELS</p>
    <hr class = "my-1" />
    <div class = "container py-5 text-muted">
      <!-- cards -->
      <div class = "row"></div>
    </div>
  </div>
`);

export const modelCard = Handlebars.compile(`
  <div class = "col-5">
    <div class = "card">
      <h5 class="card-header text-dark">
        {{title}}
      </h5>
      <img class = "card-img-top" src = ${modelimg}>
      <div class = "card-body pt-0">
        <p class="card-text text-justify">
          <span class = "d-block mb-1">
            <strong>Difficulty: </strong> Beginner
          </span>
          <strong>Description: </strong> {{description}}
        </p>
        <a href="#interface/{{model_id}}" class="btn btn-primary">Learn more</a>
      </div>
    </div>
  </div>
`);


export const mainLayout = (session) => {
  const html = main.html({session});
  return html;
}


export const instructor = {
  'setup': nTeams => {
    inst.setupInterface.build(nTeams);
  },
  'controlInterface': (teams) => {
    inst.controlInterface.build(teams);
  },
  'chatMessage': (payload) => {
    inst.controlInterface.addMessage(payload);
  },
  'addPlayer': (payload) => {
    inst.setupInterface.addPlayer(payload);
  }
}


export const player =  {
  'waitingInterface': () => {
    plyr.drawWaitingInterface();
  },
  'gameInterface': (teams) => {
    plyr.drawGameInterface(teams);
  },
  'chatMessage': (message) => {
    plyr.addMessage(message);
  }
}

export const navigation = {
  'welcome': session => {
    nav.welcome(session);
  }
}

import * as tmplt1 from './exploratory_models/model_1/main.ts';
export const getTemplate = (modelId, modelName) => {
  const id = String(modelId)

  switch(id){
    case '1':
     tmplt1.drawLayout(modelName);
    break;
  }
}

import * as roles from './roles.ts';
export const getRolesLayout = (is_Instructor) => {
  const html = roles.html({is_Instructor});
  return html;
}
