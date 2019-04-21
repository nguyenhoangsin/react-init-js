import axios from 'axios';
// import { HEADERS_AUTH, KEY_ACCESS_TOKEN } from '../../core/config';

const apiGetTokenUser = ({ username, password }) => axios({
  method: 'post',
  url: 'http://13.231.201.125:9999/api/jwt',
  headers: {
    // [HEADERS_AUTH]: localStorage.getItem(KEY_ACCESS_TOKEN),
  },
  data: { username, password },
});

const apiGetTokenUserWithFetch = ({ username, password }) => fetch(
  'http://13.231.201.125:9999/api/jwt',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  },
);

const apiGetTokenUserWithFetchCB = ({ username, password }, cbResolve, cbReject) => fetch(
  'http://13.231.201.125:9999/api/jwt',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  },
  cbResolve,
  cbReject,
);

export {
  apiGetTokenUser,
  apiGetTokenUserWithFetch,
  apiGetTokenUserWithFetchCB,
};
