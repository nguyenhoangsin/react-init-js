import { matchPath } from 'react-router-dom';
import store from '../redux/store';
import history from '../core/history';
import { authProtectRoutes } from '../redux/auth/actions';
import { TOKEN_INVALID, TOKEN_EXPIRE, LANGS, URL_AUTH, URL_HOME } from '../core/config';

const langParam = LANGS.join('|');

const protect = (pathname) => {
  const { auth: { dataToken } } = store.getState();
  if (matchPath(pathname, `/:lang(${langParam})?${URL_AUTH}`)) {
    if (dataToken && dataToken.exp * 1000 >= Date.now()) {
      history.push(`/${store.getState().language.lang}${URL_HOME}`);
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
