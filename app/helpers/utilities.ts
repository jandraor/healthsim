import * as templates from '../templates/main.ts';
import * as d3 from 'd3';
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
 * @param {boolean} [fraction = false] Indicates whether the y variable comprises two variables (numerator & denominator)
 */
export const create2DDataset = (xLabel, yLabel, dataset, fraction = false) => {
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

  if(Array.isArray(yLabel) && fraction === false) {
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

  if(Array.isArray(yLabel) && fraction === true) {
    const size = yLabel.length;
    if(size != 2) {
      console.log('yLabel must have length: 2')
      return
    }
    const twoDimensionDataset = [];
    dataset.forEach((row, index) => {
      const numerator = row[yLabel[0]];
      const denominator = row[yLabel[1]];
      twoDimensionDataset.push({
        'x': x[index],
        'y': numerator / denominator})
    });
    return twoDimensionDataset
  }
}

/**
 * superDataset is a vector in which each element is a
 * two-dimension dataset.
 * Each two-dimension dataset is a vector in which each element is a JSON object
 */
export const findExtremePoints = (superDataset) => {
  let xmax = d3.max(superDataset[0], d => { return d.x;});
  let xmin = d3.min(superDataset[0], d => { return d.x;});
  let ymin = d3.min(superDataset[0], d => { return d.y;});
  let ymax = d3.max(superDataset[0], d => { return d.y;});

  for(let i = 1; i < superDataset.length; i++){
    const dataset = superDataset[i]
    const localxmin = d3.min(dataset, d => { return d.x;});
    xmin = Math.min(xmin, localxmin);
    const localymin = d3.min(dataset, d => { return d.y;});
    ymin = Math.min(ymin, localymin);
    const localxmax = d3.max(dataset, d => { return d.x;});
    xmax = Math.max(xmax, localxmax);
    const localymax = d3.max(dataset, d => { return d.y;});
    ymax = Math.max(ymax, localymax);
  }

  const limits = {
    'xmin': xmin,
    'xmax': xmax,
    'ymin': ymin,
    'ymax': ymax
  }
  return(limits);
}

export const bindData = (dataset1, dataset2) => {
  const bindedDataset = dataset1.slice();
  dataset2.forEach(row => {
    bindedDataset.push(row)
  });
  return bindedDataset
}

export const formatToChatTime = date => {
  const militarHour = date.getHours();
  const hour = militarHour > 12 ? militarHour - 12: militarHour === 0 ? 12: militarHour;
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}`:date.getMinutes();
  const period = militarHour > 12 ? 'PM': militarHour < 12 ? 'AM': 'M'
  const formattedDate = `${hour}:${minute} ${period}`
  return formattedDate
}

export const sumVector = vector => {
  const sum = vector.reduce((a, b) => a + b, 0);
  return sum;
}

export const sumMatrix = matrix => {
  const rowSum = matrix.map(row => {
    return sumVector(row);
  });
  const sum = sumVector(rowSum);
  return sum
}

export const formatNumber = number => {
  return d3.format("~s")(number)
}

export const sumCols = (matrix, colnames) => {
  const resultObj = colnames.map((colname, index) => {
    const total = sumVector(matrix.map(row => {
      return row[index]
    }));
    const elem = {
      'x': colname,
      'y': total,
    }
    return elem
  })
  return resultObj;
}

export const sortObjArray = (array, key) => {
  const sortedData = array.sort((a, b) => {
    return d3.descending(a[key], b[key])
  })
}

export const findDepletingConst = (s0, delta, t0) => {
  const numerator = delta * s0 * Math.pow(Math.E, -1 * delta * t0);
  const denominator = 1 - Math.pow(Math.E, -1 * delta * t0);
  const k = numerator / denominator ;
  return k;
}
