import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
        <Router>
          <div>
            {/* <SideMenu /> */}
            <Navigation />
  
            <hr />
  
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.ARTIST_SIGN_UP} component={SignUpArtist} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.UPDLOAD_FILES} component={UploadFile} />
          </div>
        </Router>
      </div>
    );
  }
}

export default withAuthentication(App);
