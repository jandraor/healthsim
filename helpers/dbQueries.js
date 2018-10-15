'use strict';

module.exports = {
  insertUser: async(pool, email, firstName, lastName) =>{
    try {
      const query = `
      INSERT INTO users VALUES('${email}',
                               '${firstName}',
                               '${lastName}')

      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);
    } catch(error){
      console.log(error);
      connection.release();
      throw error;
    }
  },
  getUser: async(pool, email) => {
    try {
      const query = `
        SELECT
          email
        FROM
          users
        WHERE
          email = '${email}'
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);
    } catch (error) {
      console.log(error);
      connection.release();
      throw error;
    }
  },
  insertUserRole:async(pool, email, role_id) => {
    try {
      const query = `
        INSERT INTO users_roles (email, role_id) VALUES
          ('${email}', '${role_id}')
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);
    } catch (err) {
      console.log(err);
      connection.release();
      throw error;
    }
  },
  checkInstructor: async(pool, email) => {
    try {
      const query = `
      SELECT
        user_role_id
      FROM
        users_roles
      WHERE
        email = '${email}' AND role_id = 2
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);
    } catch (err) {
      console.log(err);
      connection.release();
      throw error;
    }
  },
  getModelName : async(pool, modelId) => {
    try {
      const query = `
        SELECT
          model_name
        FROM
          models
        WHERE
          model_id = ${modelId}
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);
    } catch (err) {
      console.log(err);
      connection.release();
      throw error;
    }
  },
  getModels: async(pool) => {
    try {
      const query = `
        SELECT
          model_id, model_name, level, description
        FROM
          models
        WHERE
          availability = 1
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);
    } catch (error) {
      console.log(error);
      connection.release();
      throw error;
    }
  },
  getFileName: async (pool, modelId) => {
    try {
      const query = `
        SELECT
          file_name
        FROM
          models
        WHERE
          model_id = ${modelId}
      `;

      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result);

    } catch (error){
      connection.release();
      throw error;
    }
  },
  checkUser: async (pool, user) => {
    try {
      const query = `
      SELECT
        email
      FROM
        users
      WHERE
        email = '${user}'
      `;

      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      let returnValue;
      if (result.length === 1) {
        returnValue = true;
      }

      if (result.length === 0) {
        returnValue = false;
      }

      if (result.length > 1) {
        throw error;
      }

      return returnValue;
    } catch (error) {
      connection.release();
      throw error;
    }
  },
  checkModelId: async (pool, modelId) => {
    try {
      const query = `
        SELECT
          model_id
        FROM
          models
        WHERE
          model_id = '${modelId}'
      `;

      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      let returnValue;
      if (result.length === 1) {
        returnValue = true;
      }

      if (result.length === 0) {
        returnValue = false;
      }

      if (result.length > 1) {
        throw error;
      }
      return returnValue;
    } catch (error) {
      connection.release();
      throw error;
    }
  },

  checkParameter: async (pool, modelId, parameterAlias) => {
    try {
      const query = `
        SELECT
          parameter_id
        FROM
          models_parameters
        WHERE
          model_id = '${modelId}' AND alias = '${parameterAlias}'
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      let returnValue;
      let parameterId = "";
      if (result.length === 1) {
        returnValue = true;
        parameterId = result[0].parameter_id
      }

      if (result.length === 0) {
        returnValue = false;
      }

      if (result.length > 1) {
        throw error;
      }
      return {'found': returnValue, 'parameterId': parameterId};

    } catch (error) {
      connection.release();
      throw error
    }
  },

  createNewScenario: async (pool, user, startTime, stopTime) => {
    try {
      const query = `
        INSERT INTO
          simulations (email, start_time, stop_time)
        VALUES
          ('${user}', ${startTime}, ${stopTime})
      `;
      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result.insertId);

    }
    catch (error) {
      console.log(error);
      connection.release();
      throw error;
    }
  },

  fillScenario: async (pool, simId, variables) => {
    try {
      let insertValues = "";
      let sep = ","
      for(let i = 0; i < variables.length ; i++){
        if(i === variables.length - 1){
          sep = "";
        }
        const elem = variables[i];
        insertValues += `(${simId}, ${elem.parameterId}, ${elem.value})${sep}`;
      }

      const query = `
        INSERT INTO
          simulations_parameters (simulation_id, parameter_id, parameter_value)
        VALUES
          ${insertValues}
      `;

      const connection = await pool.getConnection();
      const result = await connection.query(query);
      connection.release();
      return(result.insertId);
    } catch (error) {
      console.log(error);
      connection.release();
      throw error;
    }
  },

  getScenarios: async (pool, user, modelId) => {
    try {
      const query1 = `
        SELECT
          parameter_id
        FROM
          models_parameters
        WHERE
          model_id = ${modelId}
      `;

      const connection = await pool.getConnection();
      const resultQuery1 = await connection.query(query1);
      const paramsId = resultQuery1.map(elem => {
        return elem.parameter_id;
      });

      const query2 = `
        SELECT
          parameter_id, simulation_id, parameter_value
        FROM
          simulations_parameters
        WHERE
          parameter_id IN (${paramsId.join()})
          AND
          EXISTS(
            SELECT
              *
            FROM
              simulations
            WHERE
              simulations_parameters.simulation_id = simulations.simulation_id
              AND
              email = '${user}')
      `;

      const resultQuery2 = await connection.query(query2);
      const rawSimIds = resultQuery2.map(elem => {
        return elem.simulation_id;
      });
      const simIds = Array.from(new Set(rawSimIds)); //eliminate duplicates
      const query3 = `
        SELECT
           simulation_id, start_time, stop_time
        FROM
          simulations
        WHERE
          simulation_id IN (${simIds.join()})
      `;
      const resultQuery3 = await connection.query(query3);

      const result = resultQuery3.map(elem => {
        const variables = resultQuery2.filter(elem2 => {
          return (elem2.simulation_id === elem.simulation_id);
        }).map(elem3 => {
          return ({
            'parameterId': elem3.parameter_id,
            'parameterValue': elem3.parameter_value
          })
        });

        return ({
          'simId': elem.simulation_id,
          'startTime': elem.start_time,
          'stopTime': elem.stop_time,
          'variables': variables
        });
      });

      connection.release();
      console.log(result);
      return(result);
    } catch (err) {
      console.log(error);
      connection.release();
      throw error;
    }

  }
}
