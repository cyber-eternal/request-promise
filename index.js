var request = require('request')

const options = ({
  url,
  method,
  body,
  headers = {}
}) => {
  var res = {
    url,
    headers: { 'Content-Type': 'application/json', ...headers },
    method,
  };
  if (method !== 'GET' && body) { res.body = JSON.stringify(body); }
  return res;
};

var requestPromise = ({
  url,
  method,
  body,
  headers = {} }) => {
  return new Promise((resolve, reject) => {
    try {
      request(options({
        url,
        method,
        body,
        headers
      }), (error, response, body) => {
        error ? reject(error) : resolve({
          'body': body,
          'response': response,
          'header': response.headers
        });
      });
    } catch (error) {
      console.log('error in requestJSONPromise', error);
      reject(error);
    }
  });
};

module.exports = requestPromise;