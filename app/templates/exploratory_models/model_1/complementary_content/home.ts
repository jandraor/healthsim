import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-2 ml-4 mr-4">
    <h5>SIR simulator</h5>
    <p class = "text-justify textCaseStudy">
      The SIR simulator was developed at
      <a href = "https://www.nuigalway.ie/" target = "_blank">NUI Galway </a>
      to serve as tool that facilitates the understanding of processes that
      lead to the transmission of infectious diseases. This tool is intended to be
      used by public health stakeholders from diverse backgrounds.
      In this simulator, knowledge from <strong>epidemiology</strong>,
      <strong>System Dynamics</strong> and <strong>data visualisation</strong>
      are employed in such a way that the SIR model can be explored
      from the different perspectives.

      <p class = "text-justify textCaseStudy">The simulator is distributed in four panels: </p>

      <p class = "ml-1 text-justify textCaseStudy">
        On the <strong>upper left panel</strong>, you will find a panel in which the
        <strong>behaviour over time</strong> of model's variables is displayed.
      </p>
      <p class = "ml-1 text-justify textCaseStudy">
        On the <strong>upper right panel</strong>, you will find
        <strong>complementary explanations</strong> that support the
        comprehension of model's behaviour over time. Each explanation is
        distributed over 5 tabs: <strong>Verbal description, Equations,
        Bathtub metaphor (Stocks & Flows), Feedback loops and a case study.</strong>
      </p>
      <p class = "pl-1 text-justify textCaseStudy">
        On the <strong>bottom left panel</strong>, you will find the
        <strong>simulator's controls</strong>. They allow you to specify
        parameters' values and run the entire model or step by step.
      </p>
      <p class = "pl-1 text-justify textCaseStudy">
        On the <strong>bottom right panel</strong>, you will manage your
        simulations. You can <strong>store runs </strong> that you deem
        interesting and <strong>retrieve</strong> them in future sessions.
      </p>
    </p>
    <p class = "text-justify textCaseStudy">
      We invite you to explore this classic model with a modern view.
    </p>
  </div>



  `);
