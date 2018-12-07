const $ = require('jquery');
import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';
const logo2 = require('../img/logo2.svg');
const saf = require('../img/unnamed.png');
const modelimg = require('../img/SIR.png');
const logoNUIG = require('../img/logo_nuig.jpg');

export const welcome = Handlebars.compile(`
  <div class = "mt-5">
    <h3 class = "mb-3">Welcome! - This site is under development</h3>
    <p class = "text-justify">HealthSim is an <strong>open source</strong> and cloud-based application
      in which public health stakeholders can <strong>interact</strong> with
      mathematical models of infectious diseases through an
      <strong> user-friendly </strong> environment to gain deep understanding of
      the factors which influence the transmission of diseases and
      <strong>test</strong> the likely effects of various
      <strong>control strategies </strong> so that <strong>effective</strong>
      and <strong>sustainable</strong> policies can be identified, designed
      and implemented.
    </p>

    {{#if session.auth}}
    <p class = "mb-4">Click <a href="#explore">here</a> to explore simulation models.</p>
    {{else}}
    <p class = "mb-4">Sign in with any of these services to begin.</p>
		<div class="row">
		  <div class="col-sm-6">
      	<a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
      	  Sign in with Facebook
      	  <span class="fa fa-facebook"></span>
      	</a>
      	<a href="/auth/linkedin" class="btn btn-block btn-social btn-linkedin">
      	  Sign in with LinkedIn
      	  <span class="fa fa-linkedin"></span>
      	</a>
      	<a href="/auth/google" class="btn btn-block btn-social btn-google">
      	  Sign in with Google
      	  <span class="fa fa-google"></span>
      	</a>
			</div>
    </div>
    {{/if}}
    <p class = "mt-3">
      HealthSim is a project developed at the
      <strong>National University of Ireland Galway</strong>
      and funded by the <strong>Bill & Melinda Gates Foundation</strong>
      – Grand Challenges Explorations Initiative.
    </p>

  </div>
`);

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

import * as main from './mainLayout.ts'
export const mainLayout = (session) => {
  const html = main.html({session});
  return html;
}

import * as inst from './instructor/main.ts';
export const instructor = {
  'setup': nTeams => {
    inst.drawSetupInterface(nTeams);
  },
  'controlInterface': () => {
    inst.drawControlInterface();
  },
  'chatMessage': (payload) => {
    inst.addMessage(payload);
  },
  'addPlayer': (payload) => {
    inst.addPlayer(payload);
  }
}

import * as plyr from './player/main.ts';
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
