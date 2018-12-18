'use strict';
const fs = require('fs');

const simulate = (socket, payload) => {
  // const exec = require('child_process').exec;
  const filePath = 'R_Models/games/game_1/srv_run.R';
  if(!fs.existsSync(filePath)){
      const error = {
        'statusCode': 404,
        'error': 'File not found'
      };
      console.log(error);
  }

  const spawn = require('child_process').spawn;
  const r_comm = 'Rscript';
  const rspawn = spawn(r_comm, [filePath, 0, 20]);
  let results = '';
  rspawn.stdout.on('data', data => {
    const output = data.toString();
    results = results + output;
    console.log('==========start=============stdout========================');
    console.log(output);
    console.log('============end=============stdout========================');
    console.log('==========start=============payload========================');

    console.log('============end=============payload========================');

  });
  rspawn.on('close', function (code) {
    const payload = JSON.parse(results);
    console.log(payload);
    socket.emit('simulation results', payload)
    console.log('child process exited with code ' + code);
});




  // exec(`Rscript ${filePath} 0 20`, (error, stdout, stderr) => {
  //   console.log('==========start=============stdout========================');
  //   console.log(`${stdout}`);
  //   console.log('============end=============stdout========================');
  //   //const results = JSON.parse(stdout);
  //   console.log('==========start=============results========================');
  //   //console.log(results);
  //   console.log('============end=============results========================');
  //   socket.emit('simulation results')
  // });
}

module.exports = simulate;
