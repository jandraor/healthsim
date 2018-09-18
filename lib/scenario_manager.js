'use strict';
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

  router.post('/:user/:modelId/', async(req, res) => {
    try {
      const userExists = await dbQueries.checkUser(pool, req.params.user);

      if(userExists === false) {
        throw {
          statusCode: 404,
          error: 'User not found'
         };
      }
      const modelExists = await dbQueries.checkModelId(pool, req.params.modelId);

      if(modelExists === false) {
        throw {
          statusCode: 404,
          error: 'Model ID not found'
        }
      }

      const variables = Object.keys(req.body.variables);
      const promises = variables.map(async element => {
        const result = await dbQueries.checkParameter(pool, req.params.modelId, element);
        result.value = req.body.variables[element];
        return result;
      });
      // wait until all promises resolve
      const resultsPar = await Promise.all(promises)
      const validation = resultsPar.every(elem => elem.found === true)

      if(validation === false) {
        throw {
          statusCode: 404,
          error: 'Parameter not found'
        }
      }
      const newSimId = await dbQueries.createNewScenario(pool, req.params.user,
        req.body.startTime, req.body.stopTime);

      const resFillScenario = await dbQueries.fillScenario(pool,
        newSimId, resultsPar);

      res.status(201).json({message: 'Scenario stored in DB'});

    } catch(err) {
      console.log(err);
      res.status(err.statusCode || 502).json(err.error || err);
    }

  });

  router.get('/:user/:modelId/', async(req, res) => {
    try {
      const userExists = await dbQueries.checkUser(pool, req.params.user);
      if(userExists === false) {
        throw {
          statusCode: 404,
          error: 'User not found'
         };
      }

      const modelExists = await dbQueries.checkModelId(pool,
        req.params.modelId);
      if(modelExists === false) {
        throw {
          statusCode: 404,
          error: 'Model ID not found'
        }
      }
      const scenarios = await dbQueries.getScenarios(pool,
        req.params.user, req.params.modelId);
      console.log(scenarios);
      res.status(200).json(scenarios);

    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 502).json(err.error || err);
    }


  }); // end of the get '/:user/:modelId/'
  return router;
}
