import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import SignOutButton from '../../containers/SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

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
      <NavLink href={ROUTES.LANDING}>Landing</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href={ROUTES.SIGN_IN}>Sign In</NavLink>
    </NavItem>
  </Nav>
)

const NavigationAuth = () => (
  <Nav>
    <NavItem>
      <NavLink href={ROUTES.LANDING}>Landing</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href={ROUTES.HOME}>Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href={ROUTES.UPDLOAD_FILES}>Upload</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href={ROUTES.ACCOUNT}>Account</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href={ROUTES.ADMIN}>Admin</NavLink>
    </NavItem>
    <NavItem>
      <SignOutButton />
    </NavItem>
  </Nav>
);

// const NavigationAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.HOME}>Home</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ACCOUNT}>Account</Link>
//     </li>
//     <li>
//       <Link to={ROUTES.ADMIN}>Admin</Link>
//     </li>
//     <li>
//       <SignOutButton />
//     </li>
//   </ul>
// );

export default Navigation;