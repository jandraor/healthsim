const $ = require('jquery');
import * as d3 from 'd3';
import * as ut from '../../helpers/utilities.ts';

export const drawHorizontalTable = (dataset, divId) => {
  const keys = Object.keys(dataset[0]);
  const table = d3.select(`#${divId}`)
                  .append('table')
                  .attr('class', 'mx-auto tblCaseStudy');
  const rows = 2;
  let tr;
  for(let i = 0; i < rows; i++){
    tr = table.append('tr');
    for(let j = 0; j < dataset.length; j++){
      tr.append('td')
        .attr('class', 'px-2')
        .text(dataset[j][keys[i]]);
    }
  }
}

export const addRowCurrentSim = options => {
  const tableId = options.tableId;
  const table = d3.select(`#${tableId}`);
  const tr = table.select('tbody').append('tr');
  const nrun = table.select('tbody').selectAll('tr').size();
  tr.attr('id', `rowCS${nrun}`);
  tr.append('td')
    .attr('class', 'text-center')
    .text(nrun);
  const keys = Object.keys(options.rowElements);
  const ncol = keys.length;
  for(let i = 0; i < ncol; i++){
    tr.append('td')
      .attr('class', 'text-center')
      .text(options.rowElements[keys[i]]);
  }
  const icon = require('../../img/save.svg');
  tr.append('td')
    .html(`<img src = ${icon} id = 'icn${nrun}'
      class = "mx-auto d-block clickable-icon"
      width = "15" height = "15" alt="">`);

  d3.select(`#icn${nrun}`)
    .on('click', async() => {
      const reqBody = {
        startTime: options.rowElements.startTime,
        stopTime: options.rowElements.stopTime,
        variables:{
          S: options.rowElements.Population - options.rowElements.Initial_infected,
          I: options.rowElements.Initial_infected,
          R: '0',
          tp: options.rowElements.Population,
          cr: options.rowElements.Contact_rate,
          ift: options.rowElements.Infectivity,
          rd: options.rowElements.Time_to_recover
        }
      }
      const res = await ut.fetchJSON('/api/user');
      const user = res.user;
      const url = `/scenario/${user}/${options.modelId}`
      const response = await ut.fetchJSON(url, 'POST', JSON.stringify(reqBody));
      const response2 = await ut.fetchJSON(url);
      const optionsRtvSvdScn = {
        'tableId': 'tblSavedSim',
        'data': response2
      }
      retrieveSavedScenarios(optionsRtvSvdScn);

    });
}

export const retrieveSavedScenarios = async (options) => {
  const dataObject = options.data;
  const tableId = options.tableId;
  const table = d3.select(`#${tableId}`);
  dataObject.forEach(elem => {
    const susceptible = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 1)})[0]
      .parameterValue;
    const infected = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 2)})[0]
      .parameterValue;
    const recovered = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 3)})[0]
      .parameterValue;
    const totalPop = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 4)})[0]
      .parameterValue;
    const contactRate = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 5)})[0]
      .parameterValue;
    const infectivity = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 6)})[0]
      .parameterValue;
    const timeToRecover = elem.variables
      .filter(elem2 => {return(elem2.parameterId === 7)})[0]
      .parameterValue;;

    const tr = table.select('tbody').append('tr');
    const rowElements = {
      'simId': elem.simId,
      'startTime': elem.startTime,
      'stopTime': elem.stopTime,
      'population': totalPop,
      'initialInfected': infected,
      'infectivity': infectivity,
      'contactRate': contactRate,
      'timeToRecover': timeToRecover
    }
    const keys = Object.keys(rowElements);
    keys.forEach(elem => {
      tr.append('td')
        .attr('class', 'text-center')
        .text(rowElements[elem]);
    });
    const icon = require('../../img/play.svg');
    tr.append('td')
      .html(`<img src = ${icon} id = 'icn2${elem.simId}'
        class = "mx-auto d-block clickable-icon"
        width = "15" height = "15" alt="">`);

    d3.select(`#icn2${elem.simId}`)
      .on('click', () => {
        $("#varValueFrom").text(rowElements.startTime);
        $("#varValueTo").text(rowElements.stopTime);
        $("#varValueTotalPop").text(rowElements.population);
        $('#slInfected').slider('setValue', rowElements.initialInfected, false);
        $('#lInfected').text(rowElements.initialInfected);
        $('#slContactRate').slider('setValue', rowElements.contactRate, false);
        $('#lContactRate').text(rowElements.contactRate);
        $('#slInfectivity').slider('setValue', rowElements.infectivity, false);
        $('#lInfectivity').text(rowElements.infectivity);
        $('#slRecoveryDelay').slider('setValue', rowElements.timeToRecover, false);
        $('#lRecoveryDelay').text(rowElements.timeToRecover);
        $('#cbComparative')
          .prop('checked', false);
        $('#bRun').click();
      });
  }); // closes forEach
}
