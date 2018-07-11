'use strict';
const router = require('express').Router();
const csvReader = require('csvtojson');
var fs = require('fs');

router.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(403).json({
      error: 'You must sign in to use this service.',
    });
    return;
  }
  next();
});

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

router.get('/model/:model' , (req, res) => {
  try {
    const FilePath = `./R_Models/${req.params.model}.R`;
    console.log(FilePath);
    console.log("GRRRR" + req.query.gr);

    if(fs.existsSync(FilePath)){
      var exec = require('child_process').exec;
      exec(`Rscript R_Models/${req.params.model}.R ${req.query.gr}`, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        res.status(200).json(JSON.parse(stdout));
      });
    } else{
      throw err;
    }
  } catch (err) {
    res.status(err.statusCode || 502).json(err.error || err);
  }
});

module.exports = router;
