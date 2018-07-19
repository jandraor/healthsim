'use strict';
const express = require('express');

module.exports = pool => {
  const router = express.Router();

  router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(403).json({
        error: 'You must sign in to use this service.',
      });
      return;
    }
    next();
  });

  router.get('/parameters/:modelid', (req, res) => {
    try {
      const modelid = req.params.modelid;
      console.log("modelid: " + modelid);

      const query = `
        SELECT
          parameter_name
        FROM
          models_parameters
        WHERE
          model_id = ${modelid} AND defined_by_user = 1;
      `

      pool.getConnection((err, connection) => {

        connection.query(query, (err, queryResult) => {
          connection.release();
          if (err) throw err;
          console.log("queryResultLength: " + queryResult.length);

          if(queryResult.length > 0){
            const params = queryResult;
            res.status(200).json(params);
          } else {
            throw err;
          }

        });
      });

    } catch (err) {
        res.status(err.statusCode || 502).json(err.error || err);
    }
  });

  router.get('/file_name/:modelid', (req, res) => {

    try {
      const modelid = req.params.modelid;
      console.log("modelid: " + modelid);
      const query = `
        SELECT
          file_name
        FROM
          models
        WHERE
          model_id = ${modelid}
      `;

      pool.getConnection((err, connection) => {

        connection.query(query, (err, queryResult) => {
          connection.release();
          if (err) throw err;
          console.log("queryResultLength: " + queryResult.length);

          if(queryResult.length > 0){
            const filename = {"filename": queryResult[0].file_name};
            res.status(200).json(filename);
          } else {
            throw err;
          }

        });
      });
    } catch (err) {
        res.status(err.statusCode || 502).json(err.error || err);
    }

  });

  router.get("/list-available-models", (req, res) => {

    try {
      const query = `
        SELECT
          model_id, model_name, level
        FROM
          models
        WHERE
          availability = 1
      `;

      pool.getConnection((err, connection) => {

        connection.query(query, (err, queryResult) => {
          connection.release();
          if (err) throw err;
          console.log("queryResultLength: " + queryResult.length);

          if(queryResult.length > 0){
            const models = queryResult;
            console.log(JSON.stringify(models));
            res.status(200).json(models);
          } else {
            throw err;
          }

        });
      });
    } catch(err) {
      res.status(err.statusCode || 502).json(err.error || err);
    }

  });

  return router;
}
