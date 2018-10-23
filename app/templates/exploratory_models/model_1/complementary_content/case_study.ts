import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mx-2 mt-3">
    <h5 class = "text-left font-weight-bold">Influenza in a boarding school</h5>
    <p class = "text-justify font-weight-light textCaseStudy my-4">
      In 1978 in the British medical journal, The Lancet, there was a
      <a href = "https://www.bmj.com/content/1/6112/586" target = "_blank">report</a> with
      detailed statistics of an epidemic of influenza occurred in a boarding
      school in the north of England. A boarding school is a relative
      <span class = "font-weight-bold">closed community </span>
      in which all students lives on campus, teachers tend to live on or
      near campus, and students do not regularly interact with people not in the
      boarding school community. A total of <span class = "font-weight-bold">763</span>
      boys between the ages of 10 and 18 were at risk. The table below shows the
      number of individuals confined to bed each day since the start of the epidemic:
    </p>
    <div id = "caseStudyTable"></div>
    <button id = "bDraw" class = "btn btn-outline-primary mt-5 mx-1 px-15" type = "button"> Draw </button>
  </div>
`);
