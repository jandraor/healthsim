'use strict';

const summariseGames = (gameCollection) => {
  const availableGames = gameCollection.gameList.filter(elem => {
    return elem.status === 'boarding';
  });

  const summary = {
    n_Games: availableGames.length,
    games: availableGames.map(elem => {
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
  socket.emit('available games sent', games);
}

module.exports = sendAvailableGames;
