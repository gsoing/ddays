import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunnelHeader from './FunnelHeader/FunnelHeader';
import ChatBot from './ChatBot/ChatBot';
import ResultPage from './ResultPage/ResultPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FunnelHeader title="DDays 2017" />
        <div className="Layout">
          <div className="Layout__ChatBot"><ChatBot /></div>
          <div className="Layout__ResultPage"><ResultPage /></div>
        </div>
      </div>
    );
  }
}

export default App;
