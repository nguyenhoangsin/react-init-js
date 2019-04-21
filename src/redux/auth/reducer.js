import {
  GET_ACCESS_TOKEN_REQUEST,
  GET_ACCESS_TOKEN_FAILURE,
  GET_ACCESS_TOKEN_SUCCESS,
  REMOVE_ACCESS_TOKEN,
} from './actions';
import { KEY_ACCESS_TOKEN } from '../../core/config';
import { getDataToken } from '../../core/utils';

const initialState = {
  type: null,
  error: null,
  dataToken: getDataToken(localStorage.getItem(KEY_ACCESS_TOKEN)),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ACCESS_TOKEN:
      localStorage.removeItem(KEY_ACCESS_TOKEN);
      return { ...state, type: action.type, dataToken: null };

    case GET_ACCESS_TOKEN_REQUEST:
      return { ...state, type: action.type };

    case GET_ACCESS_TOKEN_FAILURE:
      return { ...state, type: action.type, error: action.error };

    case GET_ACCESS_TOKEN_SUCCESS:
      localStorage.setItem(KEY_ACCESS_TOKEN, action.token);
      return { ...state, type: action.type, error: null, dataToken: getDataToken(action.token) };

    default:
      return state;
  }
};
