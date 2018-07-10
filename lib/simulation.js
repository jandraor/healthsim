'use strict';
const router = require('express').Router();
const csvReader = require('csvtojson');
var fs = require('fs');

router.get('/filecsv/:fileName', async (req, res) => {
  try {

    const FilePath = `./${req.params.fileName}.csv`;
    console.log(FilePath);
    if (fs.existsSync(FilePath)) {
      console.log("File exists");
      const jsonData = await csvReader().fromFile(FilePath);
      res.status(200).json(jsonData);
    } else {
      throw "File does not exist";
    }

  } catch (err) {
      res.status(err.statusCode || 502).json(err.error || err);
    }
});

module.exports = router;
