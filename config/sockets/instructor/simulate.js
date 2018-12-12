'use strict';
const fs = require('fs');

const simulate = (socket, payload) => {
  const exec = require('child_process').exec;
  const filePath = 'R_Models/games/game_1/RunModelF.R';
  if(!fs.existsSync(filePath)){
      const error = {
        'statusCode': 404,
        'error': 'File not found'
      };
      console.log(error);
  }

  exec(`Rscript ${filePath}`, (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      const perro = JSON.parse(stdout);
      socket.emit('simulation results', perro);
  });
}

module.exports = simulate;
