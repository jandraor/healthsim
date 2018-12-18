'use strict';

const setInitConditions = (payload) => {
  const initConditions = payload.initConditions;
  console.log('=============Start===Init Conditions==========================');
  console.log(initConditions);
  console.log('=============End=====Init Conditions==========================');
  const fs = require('fs');
  const Json2csvParser = require('json2csv').Parser; //class
  const fields = Object.keys(initConditions[0]);
  const json2csvParser = new Json2csvParser({ fields }); //object
  const csv = json2csvParser.parse(initConditions);

  fs.writeFile('./R_Models/games/game_1/model/data/Countries.csv', csv, 'utf8', function (err) {
    if (err) {
      console.log(err);
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else{
      console.log('It\'s saved!');
    }
  });

  const exec = require('child_process').exec;
  const filePath = 'R_Models/games/game_1/srv_initialise.R';
  if(!fs.existsSync(filePath)){
      const error = {
        'statusCode': 404,
        'error': 'File not found'
      };
      console.log(error);
  }

  exec(`Rscript ${filePath}`, (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
  });
}

module.exports = setInitConditions;
