'use strict';

const dbQueries = require('../../helpers/dbQueries.js');

const socketConfig = (server, pool) => {
  const io = require('socket.io')(server);
  const instructor = require('./instructor/main.js');
  const player = require('./player/main.js');

  const gameCollection = {
    totalGameCount: 0,
    gameList: []
  }

  io.on('connection', socket => {
    console.log('A user has connected');

    socket.on('assign username',  async credentials => {
      const name = await dbQueries.getName(pool, credentials.email);
      socket.credentials = name;
    });

    //Instructor messages

    socket.on('create game session', (payload) => {
      instructor.createGame(socket, gameCollection, payload);
    });

    socket.on('send game details', payload => {
      instructor.sendGameDetails(socket, gameCollection, payload);
    });

    socket.on('start game', (payload) => {
      console.log('...starting game...');
      instructor.startGame(socket, gameCollection, io, payload);
    });

    socket.on('start new round', () => {
      console.log('...starting new round...')
      instructor.startNewRound(socket, io);
    })

    socket.on('simulate', payload => {
      console.log('...simulating...')
      instructor.simulate(socket, payload, io, gameCollection);
    });

    socket.on('send base run', payload => {
      console.log('...calculating base run...')
      instructor.getBaseRun(socket, payload, io);
    })

    //Players' messages
    socket.on('send available games', () => {
      player.sendAvailableGames(socket, gameCollection);
    });

    socket.on('join game', (data) => {
      player.joinGame(socket, gameCollection, io, data);
    });

    socket.on('decisions sent', payload => {
      player.sendDecisions(socket, io, payload);
    });

    //messages from either
    socket.on('message', payload => {
      payload.author = socket.team;
      io.to(socket.room).emit('message', payload);
    });

    socket.on('disconnect', () => {
      console.log(`User has disconnected`);
    });
  });
}

module.exports = socketConfig;
