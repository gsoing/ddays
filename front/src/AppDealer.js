import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './AppDealer.css';
import FunnelHeader from './FunnelHeader/FunnelHeader';
import ChatBot from './ChatBot/ChatBot';
import ResultPage from './ResultPage/ResultPage';
import SuggestForm from './SuggestForm/SuggestForm';
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
      vehicle: null,
    };
  }

  refreshVehicleListe = () => {

    this.setState({loading: true}, () => {
      axios.get('http://localhost:3001/fakedealer/list')
      .then((response) => {
        this.setState({
          total: response.data.total || 0,
          vehicles: response.data.vehicles || [],
          loading: false,
        })
      });
    });
  }

  makeSuggestion = (vehicle) => {
    this.setState({
      vehicle,
    })
  }

  componentDidMount(){
    this.refreshVehicleListe({});
  }

  render() {
    const { vehicles, currentParams, loading, lastQuestion, total } = this.state;
    return (
      <div className="AppDealer">
        <FunnelHeader title="Dealer interface" isDealer />
        <div className="Layout">
          <div className="Layout__ResultPage">
            <ResultPage
              vehicles={vehicles}
              currentParams={currentParams}
              loading={loading}
              total={total}
              isDealer
              onSelect={this.makeSuggestion}
            />
          </div>
          <div className="Layout__Suggest">
            <SuggestForm
                currentParams={currentParams}
                isDealer
                vehicle={this.state.vehicle}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default AppDealer;
