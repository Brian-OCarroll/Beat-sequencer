import React, { Component } from 'react';
import './App.css';
import Pads from './components/Pads';
import Controls from './components/Controls';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Controls />
            <Pads />
        </div>
    );
  }
}

export default App;

