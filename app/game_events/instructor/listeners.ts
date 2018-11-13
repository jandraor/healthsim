const $ = require('jquery');
import * as templates from '../../templates/main.ts'

export const onGameCreated = (socket) => {
  socket.on('game created', message => {
    const gameId = message.gameId;
    console.log('The game has been created');
    $('#instructorModal').modal('hide');
    $('#instructorModal').on('hidden.bs.modal', e => {
      window.location.hash = `#instructor/${gameId}`;
    });
  });
}

export const onDescriptionGiven = (socket) => {
  socket.on('team details sent', teams => {
    console.log('Team names have been sent');
    console.log(teams);
    templates.instructor.setup(teams);
  });
}

export const onPlayerAdded = (socket) => {
  socket.on('update setup interface', teams => {
    console.log('Received message: update setup interface')
    console.log(teams);
    templates.instructor.setup(teams);
  })
}
