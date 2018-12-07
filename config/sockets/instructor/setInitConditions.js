'use strict';

const setInitConditions = (payload) => {
  const fs = require('fs');
  const Json2csvParser = require('json2csv').Parser; //class
  const fields = Object.keys(payload[0]);
  const json2csvParser = new Json2csvParser({ fields }); //object
  const csv = json2csvParser.parse(payload);
  console.log(csv);

  fs.writeFile('./R_Models/games/game_1/data/Countries.csv', csv, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});
}

module.exports = setInitConditions;
