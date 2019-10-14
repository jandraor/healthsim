import * as gameEvents from '../../../../game_events/main.ts';
const $ = require('jquery');
import * as ut from '../../../../helpers/utilities.ts';

export const onClick = socket => {
  $('#bStartGame').click(() => {
    const selectValidation = validateSelects();

    if(selectValidation > -1) {
      $('.needs-validation').submit().attr('class', 'was-validated');
      ut.showAlert("Please fill out all income & population specifications");
      return
    }

    const checkboxValidation = validateCheckboxes();
    if(checkboxValidation === 0) {
      ut.showAlert('At least one team must have an infected individual');
      return
    }

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
        'xloc': (Math.ceil(teamNumber / 3)) * 1000,
        'yloc': ((teamNumber % 3 === 0) ? 3 : teamNumber % 3) * 1000,
        'Category': income,
      }
      initConditions.push(team);
    });
    const nRounds = parseInt($('#lRounds').text());
    const virusSeverity = parseFloat($('#lVirusSeverity').text()) / 100;
    const [view, ...params] = window.location.hash.split('/');
    const gameId = params[0];
    const isInfoDelayed = $('#selDelayInfo').val() === "1" ? true:false;

    const payload = {
      'gameId': gameId,
      'rounds': nRounds,
      'virusSeverity': virusSeverity,
      'initConditions': initConditions,
      'isInfoDelayed': isInfoDelayed
    }
    gameEvents.instructorEmitters.startGame(socket, payload);
  });
}

/**
 * Checks for empty values in population & income selects.
 * Returns -1 if there are empty no selections
 * Returns 0 or higher if there are empty selections
 */
const validateSelects = () => {
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

/**
 * Checks for initial infected.
 * Returns 0 if all initial infected boxes are unchecked
 * Returns >= 1 if there is al least one checked initial infected box
 */
const validateCheckboxes = () => {
  let trueCounter = 0;
  $('.cbInfected').each(function() {
    if($(this).is(":checked")){
      trueCounter++
    }
  });
  return trueCounter
}
