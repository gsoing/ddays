import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './AppDealer.css';
import FunnelHeader from './FunnelHeader/FunnelHeader';
import ChatBot from './ChatBot/ChatBot';
import ResultPage from './ResultPage/ResultPage';
import ContactForm from './ContactForm/ContactForm';
import { urlapi } from './constants';

class AppDealer extends Component {

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

  refreshVehicleListe = () => {
    const payload =  {
      lastAnswer: undefined,
      context: undefined,
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

  componentDidMount(){
    this.refreshVehicleListe({});
  }

  render() {
    const { vehicles, currentParams, loading, lastQuestion, total } = this.state;
    return (
      <div className="AppDealer">
        <FunnelHeader title="Dealer interface" />
        <div className="Layout">
          <div className="Layout__ResultPage">
            <ResultPage
              vehicles={vehicles}
              currentParams={currentParams}
              loading={loading}
              total={total}
              isDealer
            />
          </div>
          <div className="Layout__Suggest">
            <ContactForm
                currentParams={currentParams}
                isDealer
              />
          </div>
        </div>
      </div>
    );
  }
}

export default AppDealer;
