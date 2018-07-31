import * as Handlebars from '../node_modules/handlebars/dist/handlebars.js';
const logo = require('./img/logo.svg');
const logo2 = require('./img/logo2.svg')
const saf = require('./img/unnamed.png')

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
  <div class = "container-fluid pt-2">
    <div class = "row">
      <div class = "col-6">
        <h3> {{modelName}} </h3>
      </div>
      <div class = "d-flex col-6 justify-content-end">
        <a class = "navbar-brand" href = "#welcome">
          <img src = ${logo2} width = "30" height = "30" alt="">
        </a>
      </div>
    </div>
  </div>
  <div class="row hs-alerts"></div>
  <div class="container-fluid hs-interface">
    <!-- Display -->
    <div class = "row mb-3 border">
      <div id = "mainTS" class = "col-4"></div>
      <div id = "auxTS" class = "col-2">
        <div id = "divSL" class = "mt-5"></div>
      </div>
      <!-- Why -->
      <div id = "why" class = "col-6 text-center border"></div>
    </div>
    <div class = "row ">
      <div id = "controls" class = "col-12 text-muted">
        <h5 class = "my-1 text-muted"> Your decisions:</h5>
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
  <div class = "row py-1">
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
  <div class = "row py-1">
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

export const controls = Handlebars.compile(`
  <div class="row my-3 controls">
    <div class = "col-12">
      <button id = "bRun" class = "btn btn-outline-primary mx-1 px-15" type="button"> Run </button>
      <button id = "bStep" class = "btn btn-outline-primary mx-1 px-15" type="button"> Step </button>
      <button id = "bCaseStudy" class = "btn btn-outline-primary mx-1 px-15" type="button"> Case Study </button>
      <button id = "bReset" class = "btn btn-outline-primary mx-1 px-15" type="button"> Reset </button>
    </div>
  </div>
`);

export const complementaryInfo = Handlebars.compile(`
  <ul class = "nav nav-tabs" id = "myTab" role = "tablist">
    <li class = "nav-item">
      <a class ="nav-link active" id = "home-tab" data-toggle = "tab"
        href = "#pHome" role = "tab" aria-controls = "home" aria-selected = "true">
        Home
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link disabled" id = "description-tab" data-toggle = "tab"
        href = "#pDescription" role = "tab" aria-controls = "description"  aria-selected = "false">
        Description
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link" id = "stocksAndFlows-tab" data-toggle = "tab"
        href = "#pStocksAndFlows" role = "tab" aria-controls = "stocksAndFlows"  aria-selected = "false">
        Stocks & Flows
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link disabled" id = "feedbackLoops-tab" data-toggle = "tab"
        href = "#pFeedbackLoops" role = "tab" aria-controls = "feedbackLoops"  aria-selected = "false">
        Feeback Loops
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link disabled" id = "equations-tab" data-toggle = "tab"
        href = "#pEquations" role = "tab" aria-controls = "equations"  aria-selected = "false">
        Equations
      </a>
    </li>
    <li class = "nav-item">
      <a class ="nav-link disabled" id = "caseStudies-tab" data-toggle = "tab"
        href = "#pCaseStudies" role = "tab" aria-controls = "caseStudies"  aria-selected = "false">
        Case Studies
      </a>
    </li>
  </ul>
  <div class = "tab-content" id = "myTabContent">
    <div class = "tab-pane fade show active" id = "pHome" role = "tabpanel" arial-labelledby = "home-tab">
    </div>
    <div class = "tab-pane fade" id = "pDescription" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
    <div class = "tab-pane fade" id = "pStocksAndFlows" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
    <div class = "tab-pane fade" id = "pFeedbackLoops" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
    <div class = "tab-pane fade" id = "pCaseStudies" role = "tabpanel" arial-labelledby = "description-tab">
    </div>
  </div>
`);
