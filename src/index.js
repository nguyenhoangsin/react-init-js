import React, { Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/font.css';
import store from './redux/store';
import routes from './routes/routes';
import protectRoutes from './routes/protect';
import history from './core/history';
import { axiosIntercept, fetchIntercept } from './core/api-intercept';
import * as serviceWorker from './core/serviceWorker';

addLocaleData([...en, ...vi]);
protectRoutes();
axiosIntercept();
fetchIntercept();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Fragment>
        <ToastContainer />
        <Suspense fallback={<div>Loading...</div>}>
          {renderRoutes(routes)}
        </Suspense>
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
