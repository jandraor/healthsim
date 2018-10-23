export const sendGame = (socket) => {
  socket.emit('makeGame')
}

export const sendCredentials = (socket) => {
  const credentials = {
    'email': 'jair.albert.andrade',
    'first_name': 'Jair',
    'last_name': 'Andrade'
  }
  socket.emit('assign username', credentials);
}

export const onGameCreated = (socket) => {
  socket.on('game created', () => {
    console.log('The game has been created');
    //Deploy instructors interface.
  });
}
