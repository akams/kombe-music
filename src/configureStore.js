import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './redux/reducers';

export const history = createBrowserHistory();

const REACT_APP_DEVTOOLS = process.env.REACT_APP_DEVTOOLS ? JSON.parse(process.env.REACT_APP_DEVTOOLS) : false;

const middlewares = REACT_APP_DEVTOOLS
  ? composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  : applyMiddleware(routerMiddleware(history), thunk);

export default function configureStore(preloadedState) {
  const store = createStore(createRootReducer(history), preloadedState, middlewares);
  return store;
}
