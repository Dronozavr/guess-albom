import https from 'node:https';
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const parametrizeString = (name: string) => {
  return name.toLowerCase().replace(' ', '+');
};

export const fetch = async <T>(url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', err => {
        reject('Error: ' + err.message);
      });
  });
};
