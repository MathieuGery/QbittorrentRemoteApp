/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from 'axios';


const client = axios.create({
  baseURL: '',
});

const request = (options) => {
  const onSuccess = (response) => response.data;

  const onError = (error) => {
    console.debug('Request Failed:', error.config); // eslint-disable-line no-console
    if (error.response) {
      if (error.response.status === 401) {
      }
      console.debug('Status:', error.response.status); // eslint-disable-line no-console
      console.debug('Data:', error.response.data); // eslint-disable-line no-console
      console.debug('Headers:', error.response.headers); // eslint-disable-line no-console
    } else {
      console.debug('Error Message:', error.message); // eslint-disable-line no-console
    }
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
