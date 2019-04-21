import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { errorMessages, successMessages, authToken, redirectUrl } from '../middleware/middleware';
import language from './language/reducer';
import auth from './auth/reducer';

const rootReducer = combineReducers({
  language,
  auth,
});

const middleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(
      applyMiddleware(thunk, errorMessages, successMessages, authToken, redirectUrl),
    );
  }
  return applyMiddleware(thunk, errorMessages, successMessages, authToken, redirectUrl);
};

const store = createStore(rootReducer, middleware());

export default store;
