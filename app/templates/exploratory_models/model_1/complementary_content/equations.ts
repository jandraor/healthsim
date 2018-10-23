import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id="carouselEquations" class="carousel slide" data-ride="carousel" data-interval = "false">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class = "mt-2 mx-4">
          <h4> Differential equations</h4>
          <p class = "text-justify textCaseStudy">
            The SIR model consists of a system of three coupled <strong>nonlinear</strong>
            ordinary differential equations:
          </p>
          \\begin{equation}
            \\frac{dS}{dt} = -\\beta SI
          \\end{equation}
          \\begin{equation}
            \\frac{dI}{dt} = \\beta SI - \\frac{I}{rd}
          \\end{equation}
          \\begin{equation}
            \\frac{dR}{dt} = \\frac{I}{rd}
          \\end{equation}
          \\begin{equation}
            \\beta = \\frac{ce}{n}
          \\end{equation}
          \\begin{equation}
            ce = c * i
          \\end{equation}
          <div class = "text-muted text-left">
            <p class = "my-1">
              <strong>S</strong> = Susceptible;
              <strong>I</strong> = Infected;
              <strong>R</strong> = Recovered</p>
            <p class = "my-1"><strong>n</strong> = total population </p>
            <p class = "my-1"><strong>&beta;</strong> = Per capita rate at which two specific individuals come into effective contact per unit time</p>
            <p class = "my-1">
              <strong>ce</strong> = effective contacts per infected individual;
              <strong>c</strong> = contact per person per unit time;
              <strong>i</strong> = infectivity </p>
            <p class = "my-1"> <strong>rd</strong> = Time to recover from the disease </p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class = "mt-2 mx-4">
          <h4 class = "mb-2"> System Dynamics equations</h4>
          <p class = "text-justify textCaseStudy">
            The SIR model consists of a system of <strong>three stocks</strong> connected through
            <strong>two flows</strong> represented in the following difference equations:
          </p>
          <p>
            <strong>Infected(t)</strong> = Infected (t - dt) + (Infection rate - Recovery rate) * dt
          </p>
          <p>
            <strong>Susceptible(t)</strong> = Susceptible (t - dt) + (- Infection rate) * dt
          </p>
          <p>
            <strong>Recovered(t)</strong> = Recovered (t - dt) + (Recovery rate) * dt
          </p>
          <p>
            <strong>Infection rate</strong> = effective contacts per infected * susceptible contact probability
          </p>
          <p>
            <strong>Recovery rate</strong> = Infected(t) / recovery delay
          </p>
          <p>
            <strong>effective contacts per infected</strong> = infectivity * contacts per infected
          </p>
          <p>
            <strong>contacts per infected</strong> = Infected(t) * Contact rate
          </p>
          <p>
            <strong>susceptible contact probability</strong> = Susceptible(t) / total population
          </p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselEquations" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselEquations" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
`);
