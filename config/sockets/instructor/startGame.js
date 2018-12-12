'use strict';

const startGame = (socket, gameCollection, io, message) => {
  console.log('======================Game Collection=========================');
  console.log(gameCollection);
  console.log('==============================================================');
  console.log('==============================================================');
  console.log('The instructor wants to start the game');
  console.log(message);
  console.log('==========================================================');
  const gameId = message.gameId;
  const ids = gameCollection.gameList.map(elem => {
    return elem.id;
  });
  const gamePos = ids.indexOf(gameId);
  //it might be replaced by
  //gamePos = findGamePos(gameId);
  gameCollection.gameList[gamePos].status = 'on flight';
  const teamNames = gameCollection.gameList[gamePos].teams.map(elem => {
    return elem.name;
  });

  teamNames.forEach(elem => {
    const recipientTeam = elem;
    const otherTeams = teamNames.filter(elem2 => {
      return elem2 != recipientTeam;
    });
    const playerPayload = {
      'yourTeam': recipientTeam,
      'otherTeams': otherTeams
    }
    console.log('==========================Object teams======================');
    console.log(message);
    console.log('============================================================');
    io.to(`${recipientTeam}_${gameId}`).emit('game started', playerPayload);
  });
  const instructorPayload = {'teams': teamNames}
  io.to(`instructor_${gameId}`).emit('game started', instructorPayload);
  console.log('=========================Game===============================');
  gameCollection.gameList[gamePos]
  console.log('============================================================');
}

module.exports = startGame;
