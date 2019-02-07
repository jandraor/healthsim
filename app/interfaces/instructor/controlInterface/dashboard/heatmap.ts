import * as d3 from 'd3';
import * as hm from '../../../components/heatmap.ts';
import * as ut from '../../../../helpers/utilities.ts';
const $ = require('jquery');

/**
 * Creates the input for the heatmap builder & calls it
 * @param {Object} options - Function's parameters.
 * @param {number} options.rounds - Number of rounds to be played.
 * @param {Object[]} options.teams - Each element has three properties: name, population & income level.
 */
export const build = options => {
  const stopTime = options.rounds;
  const simulationTime = d3.range(0, stopTime + 1);
  const teams = options.teams.map(teamInfo => {return teamInfo.name});

  const values = teams.map(() => {
    const valueVector = []
    for(let i = 0; i < stopTime ; i++){
      valueVector.push(NaN)
    }
    return valueVector
  });

  const data = {
    'names': teams,
    'time': simulationTime,
    'values': values
   };

  hm.draw(data, 'divHeatMap');
}

export const update = newData => {
  const currentData = $('#selHeatMap').data('results');

  let results;

  if($.isEmptyObject(currentData)) {
    $('#selHeatMap').data('results', newData);
    results = newData;
  }

  if(!$.isEmptyObject(currentData)) {
    newData.shift();
    const updatedData = ut.bindData(currentData, newData);
    $('#selHeatMap').data('results', updatedData);
    results = updatedData;
  }

  $('#bSimulate').html('Simulate')
  $('#divHeatMap').html('');
  const stopTime = parseInt($('#lStopTime').text());
  const simulationTime = d3.range(0, stopTime + 1); //+ 1 to include last value

  let teams = [];
  $(`.tdTeamName`).each(function () {
    const team = $(`#${this.id}`).text();
    teams.push(team);
  });

  const yValues = teams.map(teamName => {
    let valueVector = Array(stopTime).fill(NaN);
    results.forEach(row => {
      if(simulationTime.indexOf(row.time) > -1) {
        const I1 = parseFloat(row[`${teamName}_TM_I1`])
        const I2 = parseFloat(row[`${teamName}_TM_I2`])
        const IQ = parseFloat(row[`${teamName}_TM_IQ`])
        const IAV = parseFloat(row[`${teamName}_TM_IAV`])
        const IS = parseFloat(row[`${teamName}_TM_IS`])
        const infected = I1 + I2 + IQ + IAV + IS

        valueVector[row.time] = infected;
      }
    })
    return valueVector
  })
  const data = {
    'names': teams,
    'time': simulationTime,
    'values': yValues
   };

  hm.draw(data, 'divHeatMap', true);
}
