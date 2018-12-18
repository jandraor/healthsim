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
    const payload = {
      'rounds': nRounds,
      'initConditions': initConditions,
    }
    gameEvents.instructorEmitters.setInitConditions(socket, payload);
    const [view, ...params] = window.location.hash.split('/');
    const gameId = params[0];
    const startGamePayload = {
      'gameId': gameId,
      'rounds': nRounds
    }
    gameEvents.instructorEmitters.startGame(socket, startGamePayload);
  });
}

export const clickSendMessage = (socket) =>{
  $('#bSendMessage').click(() => {
    const message = {
      'text': $('#iptMessage').val()
    }
    $('#iptMessage').val('');
    gameEvents.instructorEmitters.sendMessage(socket, message);
  });
}

export const pressAnyKey = () => {
  $(document).keypress(e => {
    if(e.which == 13) {
      if($('#iptMessage').is(":focus")){
        $('#bSendMessage').click();
      }
    }
  });
}
