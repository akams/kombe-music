import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { HomePage, SigninPage, SignupPage, SignupEnd, NotFound, Player, Albums, ZooPage, Search } from './pages';
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
        <IsUserRedirect
          user={user}
          confirmEmailVerifiedPath={ROUTES.SIGN_UP_END}
          loggedInPath={ROUTES.HOME}
          path={ROUTES.SIGN_IN}
        >
          <SigninPage dispatch={dispatch} />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          confirmEmailVerifiedPath={ROUTES.SIGN_UP_END}
          loggedInPath={ROUTES.HOME}
          path={ROUTES.SIGN_UP}
        >
          <SignupPage dispatch={dispatch} />
        </IsUserRedirect>
        <UnProtectedRoute path={ROUTES.SIGN_UP_END}>
          <SignupEnd dispatch={dispatch} />
        </UnProtectedRoute>
        <UnProtectedRoute exact path={ROUTES.HOME}>
          <HomePage IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.PLAYER}>
          <Player IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.ALBUMS}>
          <Albums IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute exact path={ROUTES.SEARCH}>
          <Search IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.SEARCH_MUSIC}>
          <Player IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.SEARCH_AUTHOR}>
          <Player IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
        </UnProtectedRoute>
        <UnProtectedRoute path={ROUTES.SEARCH_ALBUM}>
          <Player IN_APP_ROUTES={ROUTES.IN_APP_ROUTES} />
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
