import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>Inscription pour les artistes</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  lastName: '',
  firstName: '',
  birthDate: '',
  address: '',
  city: '',
  cp: '',
  country: '',
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      lastName,
      firstName,
      birthDate,
      address,
      city,
      cp,
      country,
      username,
      email,
      passwordOne,
    } = this.state;

    console.log('====>>>', this.state)

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            lastName,
            firstName,
            birthDate,
            address,
            city,
            cp,
            country,
            username,
            email,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
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
    const {
      lastName,
      firstName,
      birthDate,
      address,
      city,
      cp,
      country,
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Container style={{padding: '5%', textAlign: 'left'}} fluid={true}>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="lastName">Nom</Label>
            <Input type="text" name="lastName" id="lastName" placeholder="Dupont"
                            value={lastName}
                            onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">Prénom</Label>
            <Input type="text" name="firstName" id="firstName" placeholder="Jean" 
                            value={firstName}
                            onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate">Date de naissance</Label>
            <Input type="text" name="birthDate" id="birthDate" placeholder="01/01/1992"
                            value={birthDate}
                            onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Adresse</Label>
            <Input type="text" name="address" id="address" placeholder="3 rue jean"
              value={address}
              onChange={this.onChange}
            />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="city">Ville</Label>
                <Input type="text" name="city" id="city" placeholder="Libreville"
                  value={city}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="cp">Code postal</Label>
                <Input type="text" name="cp" id="cp" placeholder="BP8999"
                  value={cp}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="country">Pays</Label>
                <Input type="text" name="country" id="country" placeholder="Gabon" 
                  value={country}
                  onChange={this.onChange}
                />
              </FormGroup>  
            </Col>
          </Row>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="samuel-k@email.com"
              value={email}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">username</Label>
            <Input type="text" name="username" id="username" placeholder="samuel-k"
              value={username}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input 
              type="password" name="passwordOne" id="examplePassword"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="passwordTwo">Confirmer password</Label>
            <Input 
              type="password" name="passwordTwo" id="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button disabled={isInvalid} type="submit">Sign Up</Button>
        </Form>
        {error && <p>{error.message}</p>}
      </Container>
      // <form >
      //   <input
      //     name="username"
      //     value={username}
      //     onChange={this.onChange}
      //     type="text"
      //     placeholder="Full Name"
      //   />
      //   <input
      //     name="email"
          // value={email}
          // onChange={this.onChange}
      //     type="text"
      //     placeholder="Email Address"
      //   />
      //   <input
      //     name="passwordOne"
      //     value={passwordOne}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Password"
      //   />
      //   <input
      //     name="passwordTwo"
      //     value={passwordTwo}
      //     onChange={this.onChange}
      //     type="password"
      //     placeholder="Confirm Password"
      //   />
      //   <button >
      //     
      //   </button>

      //   
      // </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.ARTIST_SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };