import * as request from 'request';

const options = ({
  url,
  method,
  body,
  headers = {}
}) => {
  const res: any = {
    url,
    headers: { 'Content-Type': 'application/json', ...headers },
    method,
  };
  if (method !== 'GET' && body) { res.body = JSON.stringify(body); }
  return res;
};

export default ({
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
      }), (error: any, response: any, body: any) => {
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