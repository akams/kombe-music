import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { NotFound } from './pages';
import * as ROUTES from './constants/routes';
import { IsUserRedirect, UnProtectedRoute } from './helpers/routes';
import { withFirebase } from './context/firebase';
import { useAuthListener } from './hooks';
import { dispatchSetUsers } from './redux/action/user';

function App(props) {
  const { dispatch, firebase, dispatchSetUsersFunction } = props;
  const { user } = useAuthListener(firebase, dispatchSetUsersFunction);
  console.log({ user });
  return user !== false ? (
    <Router>
      <Switch>
        <UnProtectedRoute path={ROUTES.SIGN_UP_END}>
          <div>
            <h1>Hello</h1>
          </div>
        </UnProtectedRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  ) : (
    <div className="loader">
      <div className="preloader-preview-area" />
    </div>
  );
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: (user) => dispatchSetUsers(user),
};
const mapStateToProps = () => ({});

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(App);
