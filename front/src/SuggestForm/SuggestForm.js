import React, {Component} from 'react';
import interpolate from '../utils';
import { paramsMapping, currentServer } from '../constants';
import Star from '../Star/Star';
import axios from 'axios';
import VehicleItem from '../VehicleItem/VehicleItem';
import Loader from '../Loader/Loader';
import WebRtcDemo from '../WebRtcDemo/WebRtcDemo';


import './SuggestForm.css';

class SuggestForm extends Component {

    /**
     * @private
     */
    constructor(props) {
      super(props);

      this.state = {
        email: null,
        currentParams: {},
        paramsStars: {},
        loading: true,
        isWhishListDisplayed: true,
      };
    }

    sendSuggest = () => {
      axios.post(currentServer + ':3001/suggest', {
        vehicle: {...this.props.vehicle, price: 10000},
        dealerName: 'Renault Paris 17ieme',
      })
      .then((response) => {
        this.setState({
          isWhishListDisplayed: false,
        });
      });
    }

    componentDidMount(){
      this.interval = setInterval(() => {
        this.setState({loading: true}, () => {
          axios.get(currentServer + ':3001/wishList')
          .then((response) => {
            this.setState({
              currentParams: response.data ? response.data.currentParams : {},
              paramsStars: response.data ? response.data.paramsStars : {},
              email: response.data ? response.data.email : null,
              loading: false,
            });
            if(response.data) clearInterval(this.interval)
          });
        });
      }, 2000);
    }

    render() {
      if(!this.state.isWhishListDisplayed) {
        return <div className="SuggestForm"><WebRtcDemo /></div>;
      } else if (!this.state.email) {
        return (<div className="SuggestForm SuggestForm__flex">
          <Loader loading />
          <div className="SuggestForm__title">Waiting for wishlist</div>
      </div>);
      } else {
        return (
          <div className="SuggestForm">
            <div className="SuggestForm__title">
              <span>Client wishlist</span>
            </div>
          <div className="SuggestForm__line ContactFrom__email">
            <label className="ContactForm__emailLabel">Email</label>
            <span className="ContactForm__emailInput">{this.state.email}</span>
          </div>
          <div className="SuggestForm__line SuggestForm__criteriasTitle">
            <span>Criteria</span>
            <span>Importance</span>
          </div>
          <ul className="SuggestForm__criterias">
            { Object.keys(this.state.currentParams).map(key => (
                <li className="SuggestForm__criteria">
                  <span className="SuggestForm__tag">{paramsMapping[key](key,this.state.currentParams[key])}</span>
                  <span className="SuggestForm__star"><Star starKey={key} value={this.state.paramsStars[key]}/></span>
                </li>
              ))
            }
          </ul>
          {this.props.vehicle &&
            <div className="SuggestForm__offer">
              <div className="SuggestForm__offer__vehicle">
                <VehicleItem vehicle={this.props.vehicle} isDealer />
              </div>
              <div className="SuggestForm__offer__vehicleinfo">
                <div className="ContactForm__line ContactFrom__email">
                  <label className="ContactForm__emailLabel" htmlFor="price">Price</label>
                  <input className="ContactForm__emailInput" type="text" name="price" id="price" placeholder="10000"/>
                </div>
                <div className="SuggestForm__line ContactForm__validation">
                  <button className="SuggestForm__validationButton" onClick={this.sendSuggest}>Send suggest</button>
                </div>
              </div>
            </div>
          }
        </div>
        );
      }
    }
  }

export default SuggestForm;
