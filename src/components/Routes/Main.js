import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SideMenu from '../SideMenu'
import Navigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';

import LandingPage from '../../containers/Landing';
import SignUpPage from '../../containers/SignUp';
import SignInPage from '../../containers/SignIn';
import HomePage from '../../containers/Home';
import AccountPage from '../../containers/Account';
import AdminPage from '../../containers/Admin';
import UploadFile from '../../containers/User/UploadFile';

/** ARTIST */
import SignUpArtist from '../../containers/SignUp/SignUpArtist';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';


import '../../App.css';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.ARTIST_SIGN_UP} component={SignUpArtist} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.UPDLOAD_FILES} component={UploadFile} />
        </Switch>
      </div>
    );
  }
}

export default withAuthentication(App);
// export default App;
