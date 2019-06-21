const runScriptAsync = params => {

  const promise = new Promise ((resolve, reject) => {
    const spawn = require('child_process').spawn;
    const r_comm = 'Rscript';
    const rspawn = spawn(r_comm, params);
    let results = '';
    rspawn.stdout.on('data', data => {
      const output = data.toString();
      results = results + output;
    });
    rspawn.on('close', function (code) {
      try {
        const resultsObject = JSON.parse(results);
        resolve (resultsObject)
      } catch(err) {
        reject({
          'error': err,
          'output': results
        });
      }
    });
  });

  return promise
}

module.exports = runScriptAsync;
