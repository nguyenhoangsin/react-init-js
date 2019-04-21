import { lazy } from 'react';
import { LANGS, URL_AUTH, URL_HOME } from '../core/config';

const App = lazy(() => import('../views/App'));
const Login = lazy(() => import('../views/PageLogin'));
const Empty = lazy(() => import('../views/PageEmpty'));
const Home = lazy(() => import('../views/PageHome'));
const About = lazy(() => import('../views/PageAbout'));
const NotFound = lazy(() => import('../views/PageNotFound'));
const langParam = LANGS.join('|');

const routes = [
  {
    path: `/:lang(${langParam})?${URL_AUTH}`,
    exact: true,
    component: Login,
  },
  {
    component: App,
    routes: [
      {
        path: `/:lang(${langParam})?/`,
        exact: true,
        component: Empty,
      },
      {
        path: `/:lang(${langParam})?${URL_HOME}`,
        component: Home,
      },
      {
        path: `/:lang(${langParam})?/about`,
        component: About,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
