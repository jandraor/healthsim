import * as templates from '../templates/main.ts';
/**
* Convenience method to fetch and decode JSON.
*/
export const fetchJSON = async (url, method = 'GET', body = '') => {
try {
  if(method === 'GET') {
    const response = await fetch(url, {method, credentials: 'same-origin'});
    return response.json();
  }
  if(method === 'POST') {
    console.log(body);
    const response = await fetch(url,
      {
        method,
        credentials: 'same-origin',
        body: body,
        headers:{'Content-Type': 'application/json'}
      });
    return response.json();
  }

} catch (error) {
  return {error};
}
};

/**
 * Creates an array of two dimensional datasets.
 * @param {Object} superDataset - Array of datasets.
 * @param {string} xLabel - The name of variable x.
 * @param {string} yLabel - The name of variable y.
 */
export const create2DSuperset = (superDataset, xLabel, yLabel) => {
  const twoDSuperset = superDataset.map(dataset => {
    const x = dataset.map(d => d[xLabel]);
    const y = dataset.map(d => d[yLabel]);
    const length = x.length;

    const twoDimensionDataset = [];
    for (let i = 0; i < length; i++) {
      const temp = {
        'x' : x[i],
        'y' : y[i]
      };
      twoDimensionDataset.push(temp);
    }
    return twoDimensionDataset;
  });
  return twoDSuperset;
}

/**
 * Show an alert to the user.
 */
export const showAlert = (message, type = 'danger') => {
  const alertsElement = document.body.querySelector('.hs-alerts');
  const html = templates.alert({type, message});
  alertsElement.insertAdjacentHTML('beforeend', html);
};

/**
 * Returns an array of two-key objects from an array of n-keys object.
 * @param {Object} dataset - Array of n-keys object.
 * @param {string} xLabel - The name of variable x.
 * @param {string|string[]} yLabel - The name of variable y or the names of the variables that compound it.
 */
export const create2DDataset = (xLabel, yLabel, dataset) => {
  const x = dataset.map(d => d[xLabel]);
  const length = x.length;

  if(typeof(yLabel) === 'string') {
    const y = dataset.map(d => d[yLabel]);

    const twoDimensionDataset = [];
    for (let i = 0; i < length; i++) {
      const temp = {
        'x' : parseFloat(x[i]),
        'y' : parseFloat(y[i]),
      };
      twoDimensionDataset.push(temp);
    }
    return twoDimensionDataset;
  }

  if(Array.isArray(yLabel)) {
    const twoDimensionDataset = [];

    const y = dataset.map(row => {
      const filteredRow = Object.keys(row)
        .filter(variableName => yLabel.includes(variableName))
        .reduce((obj, variableName) => {
          obj[variableName] = row[variableName];
          return obj
        }, {});

      const sum = Object.keys(filteredRow)
        .reduce((sum, key) => {
          return (sum + parseFloat(filteredRow[key]))
        }, 0);
      return sum;

    });

    for (let i = 0; i < length; i++) {
      const temp = {
        'x' : x[i],
        'y' : y[i]
      };
      twoDimensionDataset.push(temp);
    }
    return twoDimensionDataset;
  }
}
