'use strict';
const csvReader = require('csvtojson');
const fs = require('fs');
const rp = require('request-promise');
const dbQueries = require('../helpers/dbQueries.js');

module.exports = pool => {

  const router = require('express').Router();
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

  router.get('/model/:model' , async (req, res) => {
    try {
      const queryResult = await dbQueries.getFileName(pool, req.params.model);
      const filename = queryResult[0].file_name;
      const FilePath = `./R_Models/${filename}`;

      let params = "";
      for (let key in req.query) {
        if (req.query.hasOwnProperty(key)) {
          params += `${req.query[key]} `;
        }
      }

      if(!fs.existsSync(FilePath)){
          throw ({'statusCode': 404,
            'error': 'File not found'});
        }

      const exec = require('child_process').exec;
      exec(`Rscript R_Models/${filename} ${params}`, (error, stdout, stderr) => {
          console.log(`stdout: ${stdout}`);
          res.status(200).json(JSON.parse(stdout));
        });

    } catch (err) {
      res.status(err.statusCode || 502).json(err.error || err);
    }
  });
  return router;

}
