import * as d3 from 'd3';
import * as hm from '../../../components/heatmap.ts';
import * as ut from '../../../../helpers/utilities.ts';
const $ = require('jquery');
import * as instData from '../../data.ts';

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

  const divs = ['divEpiHeatMap', 'divInvHeatMap'];

  divs.forEach(divId => {
    hm.draw({
      'data': data,
      'divId': divId,
    });
  });

}

export const update = (results, variable, prefix) => {
  const filterResult = instData.indicators.filter(variableObj => {
    return variableObj.id === variable});

  const variableObj = filterResult[0];

  $('#bSimulate').html('Simulate')
  const divId = `div${prefix}HeatMap`;
  $(`#${divId}`).html('');
  const stopTime = parseInt($('#lStopTime').text());
  const simulationTime = d3.range(0, stopTime + 1); //+ 1 to include last value

  let teams = [];
  $(`.tdTeamName`).each(function () {
    const team = $(`#${this.id}`).text();
    teams.push(team);
  });

  const yValues = teams.map(teamName => {
    let valueVector = Array(stopTime).fill(NaN);

    if(variableObj.type === 'atomic') {
      results.forEach(row => {
        if(simulationTime.indexOf(row.time) > -1) {
          const RVar = variableObj.RName;
          valueVector[row.time] = parseFloat(row[`${teamName}${RVar}`]);
        }
      });
    }

    if(variableObj.type === 'fraction') {
      results.forEach(row => {
        if(simulationTime.indexOf(row.time) > -1) {
          const RVar = variableObj.RName;
          const numerator = parseFloat(row[`${teamName}${RVar[0]}`]);
          const denominator = parseFloat(row[`${teamName}${RVar[1]}`]);
          valueVector[row.time] = numerator / denominator;
        }
      });
    }
    return valueVector
  })
  const data = {
    'names': teams,
    'time': simulationTime,
    'values': yValues
   };

  hm.draw({
    'data': data,
    'divId': divId,
    'legend': true,
    'yMax': variableObj.maxValue,
  });
}
