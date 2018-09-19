import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const caseStudy = Handlebars.compile(`
  <div class = "mx-2 mt-3">
    <h5 class = "text-left font-weight-bold">Influenza in a boarding school</h5>
    <p class = "text-justify font-weight-light textCaseStudy">
      A boarding school is a relative closed community in which all students lives
      on campus, teachers tend to live on or near campus, and students do not
      regularly interact with people not in the boarding school community. During
      January 1978 an epidemic of influenza occurred in a boarding school in the
      north of England. A total of 763 boys between the ages of 10 and 18 were at
      risk. The table below shows the number of individuals confined to bed each day
      since the start of the epidemic.
    </p>
    <div id = "caseStudyTable"></div>
    <button id = "bDraw" class = "btn btn-outline-primary mt-5 mx-1 px-15" type = "button"> Draw </button>
  </div>
`);

export const description = Handlebars.compile(`
  <div id = "descriptionContent" class = "text-justify mt-3 textCaseStudy mx-4">
  <p>
  The SIR model is an epidemiological model, due to
  <a href = "http://rspa.royalsocietypublishing.org/content/royprsa/115/772/700.full.pdf">
    Kermack and McKendrick
  </a>
  , that computes the theoretical number of people infected with a contagious
  illness in a <strong>closed population </strong> over time.
  The SIR models the flows of people between three states:
  </p>

  <ul>
    <strong>Susceptible (S) </strong>: is the number of individuals who are not infected
    but could become infected.
  </ul>

  <ul>
    <strong>Infected (I) </strong>: is the number of individuals who have the disease and
    can transmit it to the susceptibles.
  </ul>

  <ul>
    <strong>Recovered (R) </strong>: is the number of individuals who have recovered from the
    disease and are immune from getting it again.
  </ul>
  <p>
    The model assumes a time scale short enough that births and deaths can be neglected.
  </p>
  <p>
    The SIR model is used where individuals infect each other directly.
    Contact between people is also modeled to be <strong>random</strong>.
  </p>
  <p>
    The rate that people become infected is <strong>proportional</strong> to
    the number of people who are infected, and the number of people who are
    susceptible.

    If there are lots of people infected, the chances of a susceptible coming into
    contact with someone who is infected is high. Likewise, if there are very few
    people who are susceptible, the chances of a susceptible coming into contact
    with an infected is lower (since most of the contact would be between
    either infected or recovered).
  </p>
  </div>
`);

export const equations = Handlebars.compile(`
  <div class = "mt-2 mx-4">
    <h4> Differential equations</h4>
    <p class = "text-justify textCaseStudy">
      The SIR model consists of a system of three coupled <strong>nonlinear</strong>
      ordinary differential equations:</p>
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
        <p class = "my-1"><strong>&Beta;</strong> = Per capita rate at which two specific individuals come into effective contact per unit time</p>
        <p class = "my-1">
          <strong>ce</strong> = effective contacts per infected individual;
          <strong>c</strong> = contact per person per unit time;
          <strong>i</strong> = infectivity </p>
        <p class = "my-1"> <strong>rd</strong> = Time to recover from the disease </p>
      </div>
  </div>
`);
