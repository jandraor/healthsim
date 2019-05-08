const $ = require('jquery');
import * as gameEvents from '../../game_events/main.ts';
import * as ut from '../../helpers/utilities.ts';

export const playOptions = (socket, email) => {
  gameEvents.sendCredentials(socket, email);

  $('#bCreateGame').click(() => {
    socket.removeAllListeners();
    gameEvents.instructorListeners(socket);
  })

  $('#bConfirmCG').click( () => {
    const name = $('#iptGameName').val();
    const nTeams = parseInt($('#inputNTeams').val());
    if(name.length === 0) {
      $('#iptGameName').attr('class', 'form-control is-invalid')
      return
    }
    gameEvents.instructorEmitters.createSession(socket, name, nTeams);
  });

  $('#bJoinGame').click(() => {
    socket.removeAllListeners();
    gameEvents.playerListeners(socket);
    gameEvents.playerEmitters.getAvailableGames(socket);
  });
}
