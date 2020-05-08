import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import axios from 'axios';
import { connect } from 'react-redux';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../../components/PasswordForget';
import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import ENV from '../../constants/environment/common.env';


import { dispatchSetUsers } from '../../redux/action/user';

const RESOURCE = 'kmUsersFunctions/api/v1';
const getUserByUid = uid => axios.get(ENV.apiUrl + `${RESOURCE}/userLocalId/${uid}`);

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((result) => {
        getUserByUid(result.user.uid).then((userInfo) => {
          this.props.dispatchSetUsersFunction(userInfo.data);
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(e => console.error({e}))
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const mapDispatchToProps = {
  dispatchSetUsersFunction: user => dispatchSetUsers(user),
};

const mapStateToProps = () => ({
});


const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignInFormBase);

export default SignInPage;

export { SignInForm };