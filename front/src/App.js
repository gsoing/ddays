import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import FunnelHeader from './FunnelHeader/FunnelHeader';
import ChatBot from './ChatBot/ChatBot';
import ResultPage from './ResultPage/ResultPage';
import ContactForm from './ContactForm/ContactForm';

class App extends Component {

  /**
   * @private
   */
  constructor(props) {
    super(props);

    this.state = {
      currentParams: [],
      vehicles: [],
      total: null,
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
  }

  componentDidMount(){
    this.refreshVehicleListe({});
  }

  render() {
    const { vehicles, currentParams, loading, lastQuestion } = this.state;
    return (
      <div className="App">
        <FunnelHeader title="DDays 2017" />
        <div className="Layout">
          <div className="Layout__ChatBot"><ChatBot handleNewAnswer={(a) => this.refreshVehicleListe(a)} /></div>
          <div className="Layout__ResultPage">
            { !lastQuestion &&
              <ResultPage
                vehicles={vehicles}
                currentParams={currentParams}
                loading={loading}
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
