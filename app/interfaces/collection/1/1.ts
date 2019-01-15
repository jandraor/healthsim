const $ = require('jquery');
import * as d3 from 'd3';
import * as select from "./selects.ts"
import * as ts from './timeseries.ts';
import * as sl from './sparklines.ts'
import * as tables from "../../components/table.ts";
import * as sfd from "./sf.ts";
import * as sliders from "./slds.ts"
import * as runButton from './buttons/simulate/run.ts';
import * as stepButton from './buttons/simulate/step.ts';
import * as drawButton from './buttons/simulate/drawCS.ts';
import * as replayButton from './buttons/simulate/replay.ts';
import * as cld from '../../components/cld.ts';
import * as ut from '../../../helpers/utilities.ts';
import * as events from './events.ts';
// the MathJax core
const MathJax = require("../../../../node_modules/mathjax3/mathjax3/mathjax.js").MathJax;
// Tex input
const TeX = require("../../../../node_modules/mathjax3/mathjax3/input/tex.js").TeX;
// HTML output
const CHTML = require("../../../../node_modules/mathjax3/mathjax3/output/chtml.js").CHTML;
// Use browser DOM
const adaptor = require("../../../../node_modules/mathjax3/mathjax3/adaptors/browserAdaptor").browserAdaptor();
// Register the HTML document handler
require("../../../../node_modules/mathjax3/mathjax3/handlers/html.js").RegisterHTMLHandler(adaptor);

export const buildInterface = async (modelId, fetchJSON) => {
  const w = 800 * (2 / 3); //Width
  const h = 500 * (2 / 3); //Height
  const padding = 40;
  ts.buildCharts(w, h, padding);
  sl.buildCharts();

  runButton.build(modelId, fetchJSON);
  stepButton.build(modelId, fetchJSON);
  replayButton.build();
  cld.drawCLD('feedbackLoopDiagram');

  const caseStudyData = [
    {'x': 0, 'y': 1},
    {'x': 1, 'y': 3},
    {'x': 2, 'y': 25},
    {'x': 3, 'y': 72},
    {'x': 4, 'y': 222},
    {'x': 5, 'y': 282},
    {'x': 6, 'y': 256},
    {'x': 7, 'y': 233},
    {'x': 8, 'y': 189},
    {'x': 9, 'y': 123},
    {'x': 10, 'y': 70},
    {'x': 11, 'y': 25},
    {'x': 12, 'y': 11},
    {'x': 13, 'y': 4},
  ];
  const headers = {
    'x': 'Time (days)',
    'y': 'Infected'
  }
  tables.drawHorizontalTable(caseStudyData, headers, 'caseStudyTable');
  drawButton.build(caseStudyData,'bDraw');
  sfd.buildStockAndFlow();
  select.build();
  sliders.buildSliders();
  // Insert comment here
  const res = await ut.fetchJSON('/api/user');
  const user = res.user;
  const url = `/scenario/${user}/${modelId}`
  const response = await ut.fetchJSON(url);
  const optionsRtvSvdScn = {
    'tableId': 'tblSavedSim',
    'data': response
  }
  tables.retrieveSavedScenarios(optionsRtvSvdScn);

  //****************
  events.changeSelectSF();

  // initialize mathjax with with the browser DOM document; other documents are possible
  const html = MathJax.document(document, {
    InputJax: new TeX(),
    OutputJax: new CHTML({
    fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-alpha.4/mathjax2/css/'
    })
   });
   console.time('wrapper');
   // process the document
   html.findMath()
       .compile()
       .getMetrics()
       .typeset()
       .updateDocument();
   console.timeEnd('wrapper');
}
