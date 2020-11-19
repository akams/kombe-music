import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ToastContainer } from 'react-toastify';
import 'normalize.css';
import './index.css';
import App from './bis';
import Firebase from './firebase/firebase.prod';
import FirebaseContext from './context/firebase';
import configureStore, { history } from './configureStore';

import 'react-toastify/dist/ReactToastify.css';

export const myStore = configureStore();

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
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
