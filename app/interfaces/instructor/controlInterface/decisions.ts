const $ = require('jquery');

export const update = payload => {
  const team = payload.team;
  const decisions = payload.decisions;
  $(`#icnDes${team}`)
    .attr('class', 'fas fa-check icnDecisions')
    .data(decisions)
}
