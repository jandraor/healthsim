import * as Handlebars from '../node_modules/handlebars/dist/handlebars.js';
const logo = require('./img/logo.svg');

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
  <div class = "interface">
    <h1> Model 1 </h1>
    <div class = "time-series"></div>
    <p>
      <input id = "slider" type = "range"
        min = "0" max = "0.15" step = "0.01" value = "0.05">
    </p>
    <button id= "run" type="button"> Run </button>
    <button id = "step" type="button"> Step </button>
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
