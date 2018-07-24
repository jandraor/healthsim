import * as Handlebars from '../node_modules/handlebars/dist/handlebars.js';
const logo = require('./img/logo.svg');
const logo2 = require('./img/logo2.svg')

export const main = Handlebars.compile(`
  <nav class = "navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class = "container">
      <a class = "navbar-brand" href = "#welcome">
        <img src = ${logo} width = "30" height = "30" alt="">
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
  <div class="jumbotron">
    <h1>Welcome!</h1>
    <p>HealthSim is an open source and cloud-based public health supply chain simulator.</p>

    {{#if session.auth}}
    <p>Go to <a href="#interface">interface</a>.</p>
    {{else}}
    <p>Sign in with any of these services to begin.</p>
		<div class="row">
		  <div class="col-sm-6">
      	<a href="/auth/facebook" class="btn btn-block btn-social btn-facebook">
      	  Sign in with Facebook
      	  <span class="fa fa-facebook"></span>
      	</a>
      	<a href="/auth/twitter" class="btn btn-block btn-social btn-twitter">
      	  Sign in with Twitter
      	  <span class="fa fa-twitter"></span>
      	</a>
      	<a href="/auth/google" class="btn btn-block btn-social btn-google">
      	  Sign in with Google
      	  <span class="fa fa-google"></span>
      	</a>
			</div>
    </div>
    {{/if}}

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

export const interfaceLayout = Handlebars.compile(`
  <nav class = "navbar navbar-expand-lg navbar-light bg-white">
    <div class = "container-fluid">
      <a class = "navbar-brand" href = "#welcome">
        <img src = ${logo2} width = "30" height = "30" alt="">
        HealthSim
      </a>
    </div>
  </nav>
  <div class="row hs-alerts"></div>
  <div class="container-fluid hs-interface">

    <div class="row my-3">
      <div class = "col-12">
        <h3> {{modelName}} </h3>
      </div>
    </div>
    <div class="row my-2 controls">
      <div class = "col-12">
        <button id = "run" class = "btn btn-outline-primary mx-1 px-15" type="button"> Run </button>
        <button id = "step" class = "btn btn-outline-primary mx-1 px-15" type="button"> Step </button>
        <button id = "clear" class = "btn btn-outline-primary mx-1 px-15" type="button"> Clear </button>
      </div>
    </div>
    <!-- Display -->
    <div class ="row ml-2 mt-3">
      <h5> Susceptible <h5/>
    </div>
    <div class = "row mb-3">
      <div id = "mainTS" class = "col-4 bg-light"></div>
      <div id = "auxTS" class = "col-4"></div>
      <div id = "why" class = "col-4 text-center">Why is that going on</div>
    </div>
    <div class = "row ">
      <div class = "col-12 text-muted">
        <h5 = "my-1 text-muted"> Your decisions</h5>
        <hr class = "my-1 border-info" />
      </div>
    </div>
  </div>
`);

export const availableModelsLayout = Handlebars.compile(`
  <div class = "models py-4">
    <p class = "my-1"> SINGLE-REGION MODELS</p>
    <hr class = "my-1 border-primary" />

    <div class = "container py-5 text-muted">
      <!-- cards -->
      <div class = "row">

      </div>
    </div>

  </div>
`);

export const modelCard = Handlebars.compile(`
  <div class = "col-md-6 col-lg-4">
    <div class = "card">
      <h4 class="card-header">{{title}}</h4>
      <div class = "card-body">
        <h5 class="card-title">Description</h5>
        <p class="card-text">
          Difficulty, description, learning outcomes
        </p>
        <a href="#interface/{{model_id}}" class="btn btn-primary">Learn more</a>
      </div>
    </div>
  </div>
`);

//Parameters
export const parameters = Handlebars.compile(`
  <!-- First group of parameters -->
  <div class = "row py-3">
    <div class = "col-3 mx-2">
      <span class = "d-block my-2">
        <b>Infected [People]:</b>
        <span id="lInfected">100</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">0</span>
        <input id = "slInfected" data-slider-id='Infected-Slider' type="text" data-slider-min="0" data-slider-max="10000" data-slider-step="100" data-slider-value="100"/>
        <span class = "mx-2">10.000</span>
      </div>
    </div>
    <div class = "col-3 mx-2">
      <span class = "d-block my-2">
        <b>Contact rate [People per person per day]:</b>
        <span id="lContactRate">8</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">0</span>
        <input id = "slContactRate" data-slider-id='ContactRate-Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="8"/>
        <span class = "mx-2">100</span>
      </div>
    </div>
  </div>
  <!-- Second group of parameters -->
  <div class = "row py-3">
    <div class = "col-3 mx-2">
      <span class = "d-block my-2">
        <b>Infectivity [%]:</b>
        <span id="lInfectivity">0.25</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">0</span>
        <input id = "slInfectivity" data-slider-id='Infectivity-Slider' type="text" data-slider-min="0" data-slider-max="1" data-slider-step="0.05" data-slider-value="0.25"/>
        <span class = "mx-2">1</span>
      </div>
    </div>
    <div class = "col-3 mx-2">
      <span class = "d-block my-2">
        <b>Time to recover [days]:</b>
        <span id="lRecoveryDelay">2</span>
      </span>
      <div class = "form-group">
        <span class = "mx-2">1</span>
        <input class = "ModelParameter" id = "slRecoveryDelay" data-slider-id ='RecoveryDelay-Slider'
          type = "text" data-slider-min = "1" data-slider-max = "100"
          data-slider-step = "1" data-slider-value = "2"/>
        <span class = "mx-2">100</span>
      </div>
    </div>
  </div>
  `);
