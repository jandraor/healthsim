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
