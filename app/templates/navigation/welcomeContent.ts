import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
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
        	  <span class="fab fa-facebook"></span>
        	</a>
        	<a href="/auth/linkedin" class="btn btn-block btn-social btn-linkedin">
        	  Sign in with LinkedIn
        	  <span class="fab fa-linkedin"></span>
        	</a>
        	<a href="/auth/google" class="btn btn-block btn-social btn-google">
        	  Sign in with Google
        	  <span class="fab fa-google"></span>
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
