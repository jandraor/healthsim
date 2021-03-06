import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
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
