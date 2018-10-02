'use strict';
const express = require('express');
const dbQueries = require('../helpers/dbQueries.js');

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

  router.get('/model_name/:modelid', async(req, res) => {
    try {
      const modelId = req.params.modelid;
      const modelName = await dbQueries.getModels(pool, modelId);
      if(modelName.length !== 1) {
        throw {
          statusCode: 400,
          error: 'Inconsistency in the database'
         };
      }
      res.status(200).json(modelName);

    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 502).json(err.error || err);
    }
  });

  router.get("/available", async(req, res) => {
    try {
      const availableModels = await dbQueries.getModels(pool);
      if(availableModels.length === 0) {
        throw {
          statusCode: 404,
          error: 'There are no models stored in the database'
         };
      }
      console.log(JSON.stringify(availableModels));
      res.status(200).json(availableModels);
    } catch(err) {
      console.log(err);
      res.status(err.statusCode || 502).json(err.error || err);
    }
  });
  return router;
}
