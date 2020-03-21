import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faCog, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <SideNav
        onSelect={(selected) => {
          // Add your code here
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
          <NavItem eventKey="settings">
            <NavIcon>
              <FontAwesomeIcon icon={faCog} style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Paramètre
            </NavText>
            <NavItem eventKey="charts/linechart">
              <NavText>
                Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>
                Bar Chart
                </NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="library">
            <NavIcon>
              <FontAwesomeIcon icon={faVideoSlash} style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Charts
            </NavText>
            <NavItem eventKey="charts/linechart">
              <NavText>
                Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>
                Bar Chart
                </NavText>
            </NavItem>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
