import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import ClapCell from './components/instrument'
import Grid from './components/sequencerGrid'
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Grid />
      </div>
    );
  }
}
