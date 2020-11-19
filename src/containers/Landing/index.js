import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

const Landing = () => (
  <div>
    <h1>Landing</h1>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </header>
    <footer>
      <p>
        <a href="/artist/signup">Inscription pour les artistes</a>
      </p>
    </footer>
  </div>
);

export default Landing;
