import axios from 'axios';
import store from '../redux/store';
import {
  NETWORK_ERROR,
  TOKEN_INVALID,
  TOKEN_EXPIRE,
  HEADERS_AUTH,
} from './config';

const { auth: { dataToken } } = store.getState();

/**
 * Axios
 */
const axiosIntercept = () => {
  axios.interceptors.request.use((config) => {
    // Check token before request is sent
    if (Object.prototype.hasOwnProperty.call(
      config.headers,
      HEADERS_AUTH,
    )) {
      if (!dataToken) {
        const status = { response: { data: { statusText: TOKEN_INVALID } } };
        return Promise.reject(status);
      }
      if (dataToken.exp * 1000 < Date.now()) {
        const status = { response: { data: { statusText: TOKEN_EXPIRE } } };
        return Promise.reject(status);
      }
      return config;
    }
    return config;
  }, error => Promise.reject(error));

  axios.interceptors.response.use(response => response.data, (error) => {
    // Handle response error
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    const status = { statusText: NETWORK_ERROR };
    return Promise.reject(status);
  });
};

/**
 * Fetch
 */
const monkeyFetch = window.fetch;
const callMonkeyFetch = (url, config, resolve, reject) => {
  monkeyFetch(url, config)
    // Handle response
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then(res => resolve(res));
      } else response.json().then(res => reject(res));
    })
    .catch(() => reject({ statusText: NETWORK_ERROR }));
};
const checkToken = (url, config, resolve, reject) => {
  if (Object.prototype.hasOwnProperty.call(
    config.headers,
    HEADERS_AUTH,
  )) {
    // Handle token error
    if (!dataToken) {
      reject({ statusText: TOKEN_INVALID });
    } else if (dataToken.exp * 1000 < Date.now()) {
      reject({ statusText: TOKEN_EXPIRE });
    } else callMonkeyFetch(url, config, resolve, reject);
  } else callMonkeyFetch(url, config, resolve, reject);
};
const fetchIntercept = () => {
  window.fetch = (url, config, cbResolve, cbReject) => {
    // Check type fetch & token before request is sent
    if (cbResolve && cbReject) {
      checkToken(url, config, cbResolve, cbReject);
    } else {
      return new Promise((resolve, reject) => {
        checkToken(url, config, resolve, reject);
      });
    }
    return null;
  };
};

export {
  axiosIntercept,
  fetchIntercept,
};
