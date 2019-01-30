const $ = require('jquery');
import * as templates from '../../templates/main.ts'
import * as interfaces from '../../interfaces/interfaces.ts'

export const onGameCreated = (socket) => {
  socket.on('game created', payload => {
    const gameId = payload.gameId;
    $('#instructorModal').modal('hide');
    $('#instructorModal').on('hidden.bs.modal', e => {
      window.location.hash = `#instructor/${gameId}`;
    });
  });
}

export const onDescriptionGiven = socket => {
  socket.on('game details sent', payload => {
    templates.instructor.setup(payload);
    const intInstructor = interfaces.instructor();
    intInstructor.setupInterface.build(socket);
  });
}

export const onPlayerAdded = socket => {
  socket.on('player added', payload => {
    templates.instructor.addPlayer(payload);
  });
}

export const onGameStarted = socket => {
  socket.on('game started', payload => {
    templates.instructor.controlInterface(payload);
    const intInstructor = interfaces.instructor();
    intInstructor.controlInterface.build(socket, payload);
  });
}

export const onMessage = (socket) => {
  socket.on('message', payload => {
    templates.instructor.chatMessage(payload);
    const intInstructor = interfaces.instructor();
    intInstructor.controlInterface.updateOnNewMessage();
  });
}

export const onSimulationResults = socket => {
  socket.on('simulation result', payload => {
    const intInstructor = interfaces.instructor();
    intInstructor.controlInterface.updateOnSimulation(payload)
  });
}

export const onPlayerDecisions = socket => {
  socket.on('player decisions', payload => {
    const intInstructor = interfaces.instructor();
    intInstructor.controlInterface.updateDecisions(payload);
  });
}

export const onNewRoundStarted = socket => {
  socket.on('new round started', () => {
    console.log('new round started');
    const intInstructor = interfaces.instructor();
    intInstructor.controlInterface.startNewRound();
  });
}
