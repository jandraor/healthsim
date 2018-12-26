'use strict';

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

const sendAvailableGames = (socket, gameCollection) => {
  const games = summariseGames(gameCollection);
  console.log(games);
  socket.emit('current games', games);
}

module.exports = sendAvailableGames;
