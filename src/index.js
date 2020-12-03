import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';
import 'normalize.css';
import './index.css';
import { GlobalStyles } from './global-styles';
import App from './app';
import Firebase from './firebase/firebase.prod';
import FirebaseContext from './context/firebase';
import configureStore, { history } from './configureStore';

import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-dashboard-react.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const myStore = configureStore();

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <GlobalStyles />
    <Provider store={myStore}>
      <ConnectedRouter history={history}>
        <App dispatch={myStore.dispatch} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ConnectedRouter>
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
