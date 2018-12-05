'use strict';

const sendAvailableGames = (socket, gameCollection) => {
  const games = summariseGames(gameCollection);
  console.log(games);
  socket.emit('current games', games);
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

const joinGame = (socket, gameCollection, io, data) => {
  const gameId = data.id;
  const team = data.team;
  console.log('====================Join game data========================');
  console.log(data);
  console.log('==========================================================');
  const ids = gameCollection.gameList.map(elem => {
    return elem.id;
  });
  console.log('=========================Ids==============================');
  console.log(ids);
  console.log('==========================================================');
  const gamePos = ids.indexOf(gameId);
  console.log('=========================Game position====================');
  console.log(gamePos);
  console.log('==========================================================');
  const teams = gameCollection.gameList[gamePos].teams.map(elem => {
    return elem.name
  });
  const teamPos = teams.indexOf(team);
  console.log('=========================Team position====================');
  console.log(teamPos);
  console.log('==========================================================');
  gameCollection.gameList[gamePos].teams[teamPos].players.push(data.email);
  console.log('=========================Players==========================');
  console.log(gameCollection.gameList[gamePos].teams[teamPos].players);
  console.log('==========================================================');
  socket.emit('player added');
  socket.join(`${team}_${gameId}`, () => {
    console.log("========================================================");
    console.log(`A player has joined room ${gameId}`);
    console.log("========================================================");
    socket.room = gameId;
    socket.team = team;
  });
  socket.join(gameId);
  const teamsObject = gameCollection.gameList[gamePos].teams;
  io.to(gameId).emit('update setup interface', teamsObject);
}

const player = {
  'sendAvailableGames': (socket, gameCollection) => {
    sendAvailableGames(socket, gameCollection);
  },
  'joinGame': (socket, gameCollection, io, data) => {
    joinGame(socket, gameCollection, io, data);
  },
}

module.exports = player;
