'use strict';

const writeCsv = (data, file) => {
  const fs = require('fs');
  const Json2csvParser = require('json2csv').Parser; //class
  const fields = Object.keys(data[0]);
  const json2csvParser = new Json2csvParser({ fields }); //object
  const csv = json2csvParser.parse(data);
  fs.writeFile(file, csv, 'utf8', function (err) {
    if (err) {
      console.log(err);
      console.log('Some error occured - file either not saved or corrupted file saved.');
    } else{
      console.log(`File ${file} saved!`);
    }
  });
}

module.exports = writeCsv;
