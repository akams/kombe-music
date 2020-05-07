import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Container } from 'reactstrap';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import Main from './components/Routes/Main';
import rootReducer from './redux/reducers';

import './App.css';

const REACT_APP_DEVTOOLS = process.env.REACT_APP_DEVTOOLS
  ? JSON.parse(process.env.REACT_APP_DEVTOOLS)
  : false;

const history = createBrowserHistory();

const middleware = REACT_APP_DEVTOOLS
  ? composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  : applyMiddleware(thunk, routerMiddleware(history));

export const myStore = createStore(rootReducer(history), middleware);

class App extends Component {
  state = {};
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          <Main {...this.props} />
        </div>
      </ConnectedRouter>
    );
  }
}

const ReduxApp = () => (
  <Provider store={myStore}>
    <App history={history} />
  </Provider>
);

export default ReduxApp
