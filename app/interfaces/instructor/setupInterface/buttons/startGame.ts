import * as gameEvents from '../../../../game_events/main.ts';
const $ = require('jquery');

export const onClick = socket => {
  $('#bStartGame').click(() => {
    const validation = validateInputs();
    if(validation === -1) {
      $('#bStartGame').html('<i class="fa fa-spinner fa-spin"></i>');
      const initConditions = [];
      $('.cardTeam').each(function(i) {
        const teamNumber = i + 1;
        const teamName = $(`#${this.id}`).find('.card-header').text().trim();
        const popSelection = $(`#selPopSize-${teamName}`).val();
        const population = parseInt(popSelection);
        const infected = ($(`#cbInfected-${teamName}`).is(":checked")) ? 1 : 0;
        const income = $(`#selIncSize-${teamName}`).val();
        const team = {
          'Number': teamNumber,
          'Name': $(`#${this.id}`).find('.card-header').text().trim(),
          'Population': population,
          'Infected': infected,
          'Susceptible': population - infected,
          'xloc': Math.ceil(teamNumber / 3),
          'yloc': (teamNumber % 3 === 0) ? 3 : teamNumber % 3,
          'Category': income,
        }
        initConditions.push(team);
      });
      const nRounds = parseInt($('#lRounds').text());
      const virusSeverity = parseFloat($('#lVirusSeverity').text()) / 100;
      const [view, ...params] = window.location.hash.split('/');
      const gameId = params[0];
      const payload = {
        'gameId': gameId,
        'rounds': nRounds,
        'virusSeverity': virusSeverity,
        'initConditions': initConditions,
      }
      gameEvents.instructorEmitters.startGame(socket, payload);
    }
    if(validation > -1) {
      $('.needs-validation').submit().attr('class', 'was-validated');
    }
  });
}

/**
 * Checks for empty values in population & income selects.
 * Returns -1 if there are empty no selections
 * Returns 0 or higher if there are empty selections
 */
const validateInputs = () => {
  const popSizes = [];
  $('.selPopSize').each(function(){
    popSizes.push(this.value);
  });

  const incSizes = [];
  $('.selIncSize').each(function(){
    incSizes.push(this.value);
  });

  const selValues = popSizes.concat(incSizes);
  const validation = selValues.indexOf('');
  return validation;
}
