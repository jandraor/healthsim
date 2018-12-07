'use strict';

const sendGameDetails = (socket, gameCollection, message) => {
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
  socket.emit('game details sent', teamsObject);
}

module.exports = sendGameDetails;
