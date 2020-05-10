import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

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
import SignUpArtist from '../../containers/SignUp/SignUpArtist';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { dispatchSetUsers } from '../../redux/action/user';


import '../../App.css';

class App extends Component {
  state = {};

  componentWillMount() {
    this.loadUserFromToken();
  }


  loadUserFromToken() {
    let token = sessionStorage.getItem('cookie_user');
    if (!token || token === '') {
      //if there is no token, dont bother
      return;
    }
    console.log({token})
    return this.props.dispatchSetUsersFunction(JSON.parse(token));
  }

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

const mapDispatchToProps = {
  dispatchSetUsersFunction: user => dispatchSetUsers(user),
};

const mapStateToProps = () => ({
});


const AppRedux = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);


export default withAuthentication(AppRedux);
