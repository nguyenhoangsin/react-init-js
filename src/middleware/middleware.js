import { toast } from 'react-toastify';
import { TOKEN_INVALID, TOKEN_EXPIRE, URL_AUTH, URL_HOME } from '../core/config';
import history from '../core/history';
import { GET_ACCESS_TOKEN_SUCCESS, REMOVE_ACCESS_TOKEN, removeTokenUser } from '../redux/auth/actions';
import { translateMessages as t } from '../i18n/i18n';

const errorMessages = () => next => (action) => {
  if (action.error) {
    toast.error(t(action.error.statusText || action.type));
  }
  next(action);
};

const successMessages = () => next => (action) => {
  if (!action.error) {
    switch (action.type) {
      case GET_ACCESS_TOKEN_SUCCESS:
        toast.success(t(action.statusText || action.type));
        break;

      default:
        break;
    }
  }
  next(action);
};

const authToken = store => next => (action) => {
  if (action.error
    && (action.error.statusText === TOKEN_INVALID
      || action.error.statusText === TOKEN_EXPIRE)) {
    store.dispatch(removeTokenUser);
  }
  next(action);
};

const redirectUrl = store => next => (action) => {
  switch (action.type) {
    case GET_ACCESS_TOKEN_SUCCESS:
      history.push(`/${store.getState().language.lang}${URL_HOME}`);
      break;
    case REMOVE_ACCESS_TOKEN:
      history.push(`/${store.getState().language.lang}${URL_AUTH}`);
      break;

    default:
      break;
  }
  next(action);
};

export {
  errorMessages,
  successMessages,
  authToken,
  redirectUrl,
};
