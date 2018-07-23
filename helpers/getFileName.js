'use strict';

module.exports = async (pool, modelId) => {
  try {
    const query = `
      SELECT
        file_name
      FROM
        models
      WHERE
        model_id = ${modelId}
    `;

    console.log("Model ID: " + "modelID");
    const connection = await pool.getConnection();
    const result = await connection.query(query);
    connection.release();
    return(result);

  } catch (error){
    throw error;
  }
}
