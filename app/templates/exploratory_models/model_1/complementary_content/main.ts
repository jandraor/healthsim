import * as layout from './layout.ts';
import * as caseStudy from './case_study.ts';
import * as sf from './sf.ts';
import * as home from './home.ts';
import * as description from './description.ts';
import * as equations from './equations.ts';
const $ = require('jquery');

export const buildLayout = (div) => {
  $(`#${div}`).html(layout.html());
  $('#pHome').html(home.html());
  $('#pDescription').html(description.html());
  $('#pEquations').html(equations.html());
  $('#pStocksAndFlows').html(sf.html());
  $('#pCaseStudies').html(caseStudy.html());
}
