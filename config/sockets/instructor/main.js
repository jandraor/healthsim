'use strict';

const createGame = (socket, gameCollection, data) => {
  console.log(`An Instructor has requested to create a game`);
  const possibleTeams = ['alpha', 'beta', 'gamma', 'delta', 'epsilon',
  'zeta', 'eta', 'theta', 'iota', 'kappa'];
  const teams = possibleTeams.slice(0, data.nTeams);
  const newGame = {
    'id': (Math.random() + 1).toString(36).slice(2, 18),
    'instructor': 'jair.albert.andrade',
    'name': data.name,
    'teams': [],
    'status': 'boarding'
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

const startGame = (socket, gameCollection, io, message) => {
  console.log('======================Game Collection=========================');
  console.log(gameCollection);
  console.log('==============================================================');
  console.log(gameCollection);
  console.log('==========================================================');
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
    const message = {
      'yourTeam': recipientTeam,
      'otherTeams': otherTeams
    }
    console.log('==========================Object teams======================');
    console.log(message);
    console.log('============================================================');
    io.to(`${recipientTeam}_${gameId}`).emit('game started', message);
  });

  io.to(`instructor_${gameId}`).emit('game started');
  console.log('=========================Game===============================');
  gameCollection.gameList[gamePos]
  console.log('============================================================');
}


const instructor = {
  'createGame': (socket, gameCollection, data, message) =>{
    createGame(socket, gameCollection, data, message)},
  'sendGameDetails': (socket, gameCollection, message) =>{
    sendGameDetails(socket, gameCollection, message)
  },
  'startGame': (socket, gameCollection, io, message) => {
    startGame(socket, gameCollection, io, message)
  },
}

module.exports = instructor;
