import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FunnelHeader from './FunnelHeader/FunnelHeader';
import ChatBot from './ChatBot/ChatBot';
import ResultPage from './ResultPage/ResultPage';
import ContactForm from './ContactForm/ContactForm';
import { urlapi } from './constants';

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
      lastQuestion: false,
    };
  }

  refreshVehicleListe = (datas) => {
    if (datas.context === 'LASTQUESTION') return;

    if (datas.context === 'LASTQUESTION2') {
      this.setState({
        lastQuestion: true,
      })
    }
    else {
      const payload =  {
        lastAnswer: datas.lastAnswer,
        context: datas.context,
        sessionId : this.state.sessionId,
        currentParams: this.state.currentParams.length ? this.state.currentParams : undefined,
      };
      this.setState({loading: true}, () => {
        axios.post(urlapi, payload)
        .then((response) => {
          this.setState({
            currentParams: response.data.currentParams || [],
            total: response.data.total || 0,
            vehicles: response.data.vehicles || [],
            loading: false,
          })
        });
      });
    }
  }

  componentDidMount(){
    this.refreshVehicleListe({});
  }

  render() {
    const { vehicles, currentParams, loading, lastQuestion, total } = this.state;
    return (
      <div className="App">
        <FunnelHeader title="DDays 2017 - Car Chooser" />
        <div className="Layout">
          <div className="Layout__ChatBot"><ChatBot handleNewAnswer={(a) => this.refreshVehicleListe(a)} /></div>
          <div className="Layout__ResultPage">
            { !lastQuestion &&
              <ResultPage
                vehicles={vehicles}
                currentParams={currentParams}
                loading={loading}
                total={total}
              />
            } {
              lastQuestion &&
              <ContactForm
                currentParams={currentParams}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
