import { apiGetTokenUser } from './apis';

const GET_ACCESS_TOKEN_REQUEST = 'GET_ACCESS_TOKEN_REQUEST';
const GET_ACCESS_TOKEN_FAILURE = 'GET_ACCESS_TOKEN_FAILURE';
const GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN';
const AUTH_PROTECT_ROUTES = 'AUTH_PROTECT_ROUTES';

const getTokenUser = ({ username, password }) => (dispatch, getState) => {
  dispatch({ type: GET_ACCESS_TOKEN_REQUEST });

  const { auth: { accessToken } } = getState();
  apiGetTokenUser({ accessToken, username, password })
    .then((res) => {
      console.log('res', res);
      dispatch({ type: GET_ACCESS_TOKEN_SUCCESS, token: res.data.token });
    })
    .catch((error) => {
      console.log('error', error);
      dispatch({ type: GET_ACCESS_TOKEN_FAILURE, error });
    });
};

const removeTokenUser = { type: REMOVE_ACCESS_TOKEN };

const authProtectRoutes = statusText => ({ type: AUTH_PROTECT_ROUTES, error: { statusText } });

export {
  GET_ACCESS_TOKEN_REQUEST,
  GET_ACCESS_TOKEN_FAILURE,
  GET_ACCESS_TOKEN_SUCCESS,
  REMOVE_ACCESS_TOKEN,
  getTokenUser,
  removeTokenUser,
  authProtectRoutes,
};
