const $ = require('jquery');
import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';
import * as layouts from './helpers/layouts.ts';
import * as ctrl from './helpers/controls.ts';
import * as inputs from './helpers/inputs.ts';
import * as cmpContent from './helpers/complementaryContent.ts';
import * as homeContent from './helpers/home.ts';
import * as sfdContent from './helpers/sfd.ts';
const logo = require('../img/logo.svg');
const logo2 = require('../img/logo2.svg');
const saf = require('../img/unnamed.png');
const modelimg = require('../img/SIR.png');
const logoNUIG = require('../img/logo_nuig.jpg');

export const main = Handlebars.compile(`
  <nav class = "navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class = "container">
      <a class = "navbar-brand" href = "#welcome">
        <!--<img src = ${logo} width = "30" height = "30" alt="">-->
        HealthSim
      </a>
      <button class = "navbar-toggler" type = "button" data-toggle = "collapse" data-target = ".dual-collapse2">
        <span class = "navbar-toggler-icon"></span>
      </button>
     <div class = "collapse navbar-collapse dual-collapse2" id = "mainNav">
        <ul class ="navbar-nav mx-auto" >
          <li class="nav-item active">
            <a class="nav-link" href = "#welcome">Home</a>
          </li>
          <li class="nav-item">
            <a class = "nav-link" href = "#explore">Explore</a>
          </li>
          <li class="nav-item">
            <a class = "nav-link" href = "#play">Play</a>
          </li>
          <li class="nav-item">
            <a class = "nav-link" href = "#resources">Resources</a>
          </li>
          <li class="nav-item">
            <a class = "nav-link" href = "#about">About</a>
          </li>
          <li class="nav-item">
            <a class = "nav-link" href = "#Contact">Contact</a>
          </li>

       </ul>
      </div>
      <div class="collapse navbar-collapse dual-collapse2">
      <ul class="navbar-nav ml-auto">
        {{#if session.auth}}
          <li class="nav-item">
            <a class="nav-link" href="#models">My models</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/auth/signout">Sign out</a>
          </li>
        {{else}}
          <li class="nav-item">
            <a class="nav-link" href="#welcome">Sign in</a>
          </li>
        {{/if}}
      </ul>
    </div>
  </div>
    </div>
  </nav>
  <div class="container">
  <div class="hs-alerts"></div>
  <div class="hs-main"></div>
  </div>
`);

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

export const roleLayout = Handlebars.compile(`
  <div id = "divRoles" class = "mt-3">
    <p class = "my-1"> ROLES</p>
    <hr class = "my-1" />
    <div class = "container py-5 text-muted">
      <!-- role cards -->
      <div class = "row">
        {{#if is_Instructor}}
        <div class = "col-5">
          <div class = 'card'>
            <div class="card-header">
              <span class = 'text-dark'>Instructor</span>
            </div>
            <div class = 'card-body'>
              <p>
                Description of what a instructor is & can do
              </p>
              <a href="#"
                class = "btn btn-primary" id = 'bCreateGame'>Create game</a>
            </div>
          </div>
        </div>
        {{/if}}
        <div class = "col-5">
          <div class = 'card'>
            <div class="card-header">
              <span class = 'text-dark'>Player</span>
            </div>
            <div class = 'card-body'>
              <p>
                Description of what a player is & can do
              </p>
              <a href="#"
                class="btn btn-primary">Join game</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`);

export const getTemplate = (modelId, modelName) => {
  document.body.innerHTML = layouts.simulationInterface({modelName});
  const controlsElement = document.body.querySelector('#divControls');
  controlsElement.insertAdjacentHTML('beforeend', ctrl.buttons());
  const totalPop = $('#varValueTotalPop').text();
  const initial = String(parseFloat(totalPop) / 100);
  const step = String(parseFloat(totalPop) / 100);
  const slidersElement = document.body.querySelector('#divSliders');
  slidersElement.insertAdjacentHTML('beforeend',
    inputs.parameters({totalPop, initial, step}));
  const complementaryElement = document.body.querySelector('#why');
  complementaryElement.insertAdjacentHTML('beforeend', layouts.complementaryInfo());
  const caseStudyElement = document.body.querySelector('#pCaseStudies');
  caseStudyElement.insertAdjacentHTML('beforeend', cmpContent.caseStudy());
  const sfdElement = document.body.querySelector('#pStocksAndFlows');
  sfdElement.insertAdjacentHTML('beforeend', sfdContent.layout());
  const simulationsElement = document.body.querySelector('#divSimulations');
  simulationsElement.insertAdjacentHTML('beforeend', layouts.simulationsInfo());
  const descriptionElement = document.body.querySelector('#pDescription');
  descriptionElement.insertAdjacentHTML('beforeend', cmpContent.description());
  const equationElement = document.body.querySelector('#pEquations');
  equationElement.insertAdjacentHTML('beforeend', cmpContent.equations());
  const homeElement = document.body.querySelector('#pHome');
  homeElement.insertAdjacentHTML('beforeend', homeContent.instructions());
}
