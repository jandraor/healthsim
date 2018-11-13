'use strict';

const socketConfig = (server) => {
  const io = require('socket.io')(server);

  const gameCollection = {
    totalGameCount: 0,
    gameList: []
  }

  io.on('connection', function (socket) {
    console.log('A user has connected');

    socket.on('assign username', credentials => {
      console.log(credentials.email);
      socket.credentials = credentials;
      console.log(socket.credentials);
    });

    socket.on('makeGame', (data) => {
      console.log(`${socket.credentials.first_name} has requested to create a game`);
      const possibleTeams = ['alpha', 'beta', 'gamma', 'delta', 'epsilon',
      'zeta', 'eta', 'theta', 'iota', 'kappa'];
      const teams = possibleTeams.slice(0, data.nTeams);
      const newGame = {
        'id': (Math.random() + 1).toString(36).slice(2, 18),
        'instructor': socket.credentials.email,
        'name': data.name,
        'teams': []
      }
      teams.forEach(elem => {
        const newTeam = {
          name: elem,
          players: [] //emails
        }
        newGame.teams.push(newTeam);
      });

      gameCollection.gameList.push(newGame);
      gameCollection.totalGameCount++;
      socket.join('instructor', () => {
        console.log("========================================================");
        console.log('An instructor has joined');
        console.log("========================================================");
      });
      console.log(gameCollection.gameList[gameCollection.gameList.length - 1]);
      const reply = {'gameId': newGame.id}
      socket.emit('game created', reply);
    });

    socket.on('are there games', () => {
      const games = summariseGames(gameCollection);
      console.log(games);
      socket.emit('current games', games);
    });

    socket.on('join game', (data) => {
      console.log('====================Join game data========================');
      console.log(data);
      console.log('==========================================================');
      const ids = gameCollection.gameList.map(elem => {
        return elem.id;
      });
      console.log('=========================Ids==============================');
      console.log(ids);
      console.log('==========================================================');
      const gamePos = ids.indexOf(data.id);
      console.log('=========================Game position====================');
      console.log(gamePos);
      console.log('==========================================================');
      const teams = gameCollection.gameList[gamePos].teams.map(elem => {
        return elem.name
      });
      const teamPos = teams.indexOf(data.team);
      console.log('=========================Team position====================');
      console.log(teamPos);
      console.log('==========================================================');
      gameCollection.gameList[gamePos].teams[teamPos].players.push(data.email);
      console.log('=========================Players==========================');
      console.log(gameCollection.gameList[gamePos].teams[teamPos].players);
      console.log('==========================================================');
      socket.emit('player added');
      const teamsObject = gameCollection.gameList[gamePos].teams;
      io.to('instructor').emit('update setup interface', teamsObject);
    });

    socket.on('send team details', message =>{
      const gameId = message.gameId;
      console.log('=========================Game ID==========================');
      console.log(typeof(gameId));
      const ids = gameCollection.gameList.map(elem => {
        return elem.id;
      });
      const gamePos = ids.indexOf(gameId);
      console.log('=========================Game position====================');
      console.log(gamePos);
      const teamsObject = gameCollection.gameList[gamePos].teams;
      socket.emit('team details sent', teamsObject);
    })

    socket.on('disconnect', () => {
      console.log(`User has disconnected`);
    });
  });

}

const summariseGames = (gameCollection) => {
  const summary = {
    n_Games: gameCollection.totalGameCount,
    games: gameCollection.gameList.map(elem => {
      const game = {
        'id': elem.id,
        'name': elem.name,
        'instructor': elem.instructor,
        'teams': elem.teams
      }
      return (game);
    })
  }
  return summary;
}
module.exports = socketConfig;
