'use strict';

const createPolicyMatrix = payload => {
  const Json2csvParser = require('json2csv').Parser; //class
  const fields = Object.keys(payload[0]);
  const json2csvParser = new Json2csvParser({ fields }); //object
  const csv = json2csvParser.parse(payload);
  const fs = require('fs');
  fs.writeFile('./R_Models/games/game_1/model/data/PolicyMatrix.csv', csv, 'utf8', function (err) {
    if (err) {
      console.log(err);
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else{
      console.log('Policy matrix file created');
    }
  });
}

module.exports = createPolicyMatrix;
