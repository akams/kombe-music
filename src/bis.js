import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { HomePage } from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, ProtectedRoute, UnProtectedRoute } from './helpers/routes';
import { withFirebase } from './context/firebase';
import { useAuthListener } from './hooks';
import { dispatchSetUsers } from './redux/action/user';

function App(props) {
  const { dispatch, firebase, dispatchSetUsersFunction } = props;
  return (
    <Router>
      <Switch>
        <UnProtectedRoute path={ROUTES.HOME}>
          <HomePage />
        </UnProtectedRoute>
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: (user) => dispatchSetUsers(user),
};
const mapStateToProps = () => ({});

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(App);
