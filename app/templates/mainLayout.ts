import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';
const logo = require('../img/logo.svg');

export const html = Handlebars.compile(`
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
            <a class = "nav-link" href = "http://healthsim.ie:8000">Go.Data</a>
          </li>
       </ul>
      </div>
      <div class="collapse navbar-collapse dual-collapse2">
      <ul class="navbar-nav ml-auto">
        {{#if session.auth}}
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
