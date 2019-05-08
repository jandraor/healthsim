'use strict';

const createGame = (socket, gameCollection, data) => {
  console.log(`An Instructor has requested to create a game`);
  const possibleTeams = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon',
  'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
  const teams = possibleTeams.slice(0, data.nTeams);
  const newGame = {
    'id': (Math.random() + 1).toString(36).slice(2, 18),
    'instructor': socket.credentials,
    'name': data.name,
    'teams': [],
    'status': 'boarding'
  }
  teams.forEach(elem => {
    const newTeam = {
      name: elem,
      players: [], //names
    }
    newGame.teams.push(newTeam);
  });

  gameCollection.gameList.push(newGame);
  gameCollection.totalGameCount++;
  socket.join(newGame.id, () => {
    console.log("========================================================");
    console.log(`An instructor has joined room ${newGame.id}`);
    console.log("========================================================");
    socket.room = newGame.id;
    socket.team = 'instructor'
  });

  socket.join(`instructor_${newGame.id}`);

  console.log(gameCollection.gameList[gameCollection.gameList.length - 1]);
  const reply = {'gameId': newGame.id}
  socket.emit('game created', reply);
}

module.exports = createGame;
