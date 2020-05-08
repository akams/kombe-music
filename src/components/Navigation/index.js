import React from 'react';
import { Link } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap';

import SignOutButton from '../../containers/SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext, withAuthentication } from '../Session';

class Navigator extends React.Component {
  render() {
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    )
  }
}


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);


const NavigationNonAuth = () => (
  <Nav>
    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </div>
    </NavItem>
    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </div>
    </NavItem>
  </Nav>
)

const NavigationAuth = () => (
  <Nav>
    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.LANDING}>Landing</Link>
      </div>
    </NavItem>
    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.HOME}>Home</Link>
      </div>
    </NavItem>
    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.UPDLOAD_FILES}>Upload</Link>
      </div>
    </NavItem>

    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </div>
    </NavItem>
    <NavItem>
      <div className="nav-link">
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </div>
    </NavItem>
    <NavItem>
      <SignOutButton />
    </NavItem>
  </Nav>
);

export default withAuthentication(Navigator);