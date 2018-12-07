import * as gameEvents from '../../../game_events/main.ts';
const $ = require('jquery');

export const clickStartGame = (socket) => {
  $('#bStartGame').click(() => {
    const initConditions = [];
    $('.cardTeam').each(function(i) {
      const teamNumber = i + 1;
      const teamName = $(`#${this.id}`).find('.card-header').text().trim();
      const popSelection = $(`#selPopSize-${teamName}`).val();
      const population = parseInt(popSelection);
      const infected = ($(`#cbInfected-${teamName}`).is(":checked")) ? 1 : 0;
      const income = $(`#selIncSize-${teamName}`).val();
      //Must validate popSelection & income;
      const team = {
        'number': teamNumber,
        'name': $(`#${this.id}`).find('.card-header').text().trim(),
        'population': population,
        'infected': infected,
        'susceptible': population - infected,
        'xloc': Math.ceil(teamNumber / 3),
        'yloc': (teamNumber % 3 === 0) ? 3 : teamNumber % 3,
        'category': income,
      }
      initConditions.push(team);
    });
    gameEvents.instructorEmitters.setInitConditions(socket, initConditions);
    const [view, ...params] = window.location.hash.split('/');
    const gameId = params[0];
    gameEvents.instructorEmitters.startGame(socket, gameId);
  });
}
