'use strict';

const socketConfig = (server) => {
  const io = require('socket.io')(server);
  const instructor = require('./instructor/main.js');
  const player = require('./player/main.js');

  const gameCollection = {
    totalGameCount: 0,
    gameList: []
  }

  io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('assign username', credentials => {
      console.log(credentials.email);
      socket.credentials = credentials;
      console.log(socket.credentials);
    });
    //Instructor messages
    socket.on('create game session', (payload) => {
      console.log('=====================Socket before========================');
      console.log(socket.room)
      console.log('==========================================================');
      console.log('========Before========Game Collection=====================');
      console.log(gameCollection);
      console.log('==========================================================');
      instructor.createGame(socket, gameCollection, payload);
      console.log('=======After==========Game Collection=====================');
      console.log(gameCollection);
      console.log('==========================================================');
      console.log('=====================Socket after=========================');
      console.log(socket.room)
      console.log('==========================================================');
    });

    socket.on('send game details', payload => {
      console.log('==========================================================');
      console.log('Received message for sending game details');
      console.log('==========================================================');
      instructor.sendGameDetails(socket, gameCollection, payload);
    });

    socket.on('start game', (payload) => {
      console.log('======================start game: payload==================');
      console.log(payload);
      console.log('==========================================================');
      instructor.startGame(socket, gameCollection, io, payload);
      console.log('================After==Game Collection=====================');
      console.log(gameCollection.gameList[0]);
      console.log('==========================================================');
    });

    //Players' messages
    socket.on('send available games', () => {
      player.sendAvailableGames(socket, gameCollection);
    });
    socket.on('join game', (data) => {
      console.log('=========Before=======Game Collection=====================');
      console.log(gameCollection.gameList[0]);
      console.log('==========================================================');
      player.joinGame(socket, gameCollection, io, data);
      console.log('=========After========Game Collection=====================');
      console.log(gameCollection.gameList[0]);
      console.log('==========================================================');
    });
    socket.on('decisions sent', payload => {
      console.log('========player decisions===================================');
      console.log(payload)
      console.log('==========================================================');
      player.sendDecisions(socket, io, payload);
    });
    //messages from either
    socket.on('message', payload => {
      payload.author = socket.team;
      console.log(payload);
      io.to(socket.room).emit('message', payload);
    });

    socket.on('simulate', payload => {
      console.log('=========simulate conditions payload=======================');
      console.log(payload)
      console.log('==========================================================');
      instructor.simulate(socket, payload, io, gameCollection);
    });

    socket.on('start new round', () => {
      instructor.startNewRound(socket, io);
    })

    socket.on('disconnect', () => {
      console.log(`User has disconnected`);
    });
  });
}

module.exports = socketConfig;
