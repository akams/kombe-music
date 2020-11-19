import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faCog, faVideoSlash, faList } from '@fortawesome/free-solid-svg-icons';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { NavLink } from 'reactstrap';

import SignOutButton from '../../containers/SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './style.css';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

function NavigationNonAuth() {
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
        console.log({ selected });
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavLink href={ROUTES.LANDING}>
            <NavIcon>
              <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.75em' }} />
            </NavIcon>
            {/* <NavText> */}
            <span>Landing</span>
            {/* </NavText> */}
          </NavLink>
        </NavItem>
        {/* <NavItem eventKey="search">
          <NavLink href={ROUTES.SIGN_IN}>
            <NavIcon>
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              <span>Sign In</span>
            </NavText>
          </NavLink>
        </NavItem> */}
      </SideNav.Nav>
    </SideNav>
  );
}

function NavigationAuth() {
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
        console.log({ selected });
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <span>Accueil</span>
          </NavText>
        </NavItem>
        <NavItem eventKey="search">
          <NavIcon>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>
            <span>Recherche</span>
          </NavText>
        </NavItem>

        <NavItem eventKey="playlist">
          <NavIcon>
            <FontAwesomeIcon icon={faList} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Ma Playlist</NavText>
          <NavItem eventKey="playlist/linechart">
            <NavText>Upload fichier</NavText>
          </NavItem>
          <NavItem eventKey="playlist/barchart">
            <NavText>Bar Chart</NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="settings">
          <NavIcon>
            <FontAwesomeIcon icon={faCog} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Paramètre</NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>Line Chart</NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>Bar Chart</NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="library">
          <NavIcon>
            <FontAwesomeIcon icon={faVideoSlash} style={{ fontSize: '1.75em' }} />
          </NavIcon>
          <NavText>Charts</NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>Line Chart</NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>Bar Chart</NavText>
          </NavItem>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Navigation;
