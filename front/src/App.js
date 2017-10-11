import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FunnelHeader from './FunnelHeader/FunnelHeader';
import ChatBot from './ChatBot/ChatBot';
import ResultPage from './ResultPage/ResultPage';

class App extends Component {

  /**
   * @private
   */
  constructor(props) {
    super(props);

    this.state = {
      currentParams: [],
      vehicles: [],
      total: 0,
      loading: true,
      sessionId: Math.random().toString(36).substring(2, 15),
    };
  }

  refreshVehicleListe = (datas) => {
    const payload =  {
      lastAnswer: datas.lastAnswer,
      context: datas.context,
      sessionId : this.state.sessionId,
      currentParams: this.state.currentParams,
    };
    this.setState({loading: true}, () => {
      axios.post('http://localhost:3003/api/test', payload)
        .then((response) => {
          this.setState({
            ...response.data,
            loading: false,
          })
        });
    });
  }

  componentDidMount(){
    this.refreshVehicleListe({});
  }

  render() {
    const { vehicles, currentParams, loading, total} = this.state;
    return (
      <div className="App">
        <FunnelHeader title="DDays 2017" />
        <div className="Layout">
          <div className="Layout__ChatBot"><ChatBot handleNewAnswer={(a) => this.refreshVehicleListe(a)} /></div>
          <div className="Layout__ResultPage">
            <ResultPage
              vehicles={vehicles}
              currentParams={currentParams}
              loading={loading}
              total={total}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
