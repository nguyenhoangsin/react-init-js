import { matchPath } from 'react-router-dom';
import store from '../redux/store';
import history from '../core/history';
import { getDataToken } from '../core/utils';
import { authProtectRoutes } from '../redux/auth/actions';
import { KEY_ACCESS_TOKEN, KEY_LANG, TOKEN_INVALID, TOKEN_EXPIRE, LANGS, URL_AUTH, URL_HOME } from '../core/config';

const langParam = LANGS.join('|');

const protect = (pathname) => {
  const token = localStorage.getItem(KEY_ACCESS_TOKEN);
  const dataToken = getDataToken(token);
  if (matchPath(pathname, `/:lang(${langParam})?${URL_AUTH}`)) {
    if (dataToken && dataToken.exp * 1000 >= Date.now()) {
      history.push(`/${localStorage.getItem(KEY_LANG) ? localStorage.getItem(KEY_LANG) : LANGS[0]}${URL_HOME}`);
    }
  } else if (!dataToken) {
    store.dispatch(authProtectRoutes(TOKEN_INVALID));
  } else if (dataToken.exp * 1000 < Date.now()) {
    store.dispatch(authProtectRoutes(TOKEN_EXPIRE));
  }
};

const protectRoutes = () => {
  protect(history.location.pathname);

  history.listen((location) => {
    setTimeout(() => {
      protect(location.pathname);
    }, 0);
  });
};

export default protectRoutes;
