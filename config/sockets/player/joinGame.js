'use strict';

const joinGame = (socket, gameCollection, io, data) => {
  const gameId = data.id;
  const team = data.team;
  const player = socket.credentials;
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
  gameCollection.gameList[gamePos].teams[teamPos].players.push(player);
  console.log('=========================Players==========================');
  console.log(gameCollection.gameList[gamePos].teams[teamPos].players);
  console.log('==========================================================');
  socket.emit('player added'); // Message to the player just added
  socket.join(`${team}_${gameId}`, () => {
    console.log("========================================================");
    console.log(`A player has joined room ${gameId}`);
    console.log("========================================================");
    socket.room = gameId;
    socket.team = team;
  });
  socket.join(gameId);
  const payload = {
    'player': player,
    'team': team,
  };
  io.to(`instructor_${gameId}`).emit('player added', payload);
}

module.exports = joinGame;
