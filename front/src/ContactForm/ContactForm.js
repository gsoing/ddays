import React, {Component} from 'react';
import interpolate from '../utils';
import axios from 'axios';
import { paramsMapping, currentServer } from '../constants';
import Star from '../Star/Star';
import VehicleItem from '../VehicleItem/VehicleItem';

import './ContactForm.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

class ContactForm extends Component {

    /**
     * @private
     */
    constructor(props) {
      super(props);

      this.state = {
        isWaitingSuggest: false,
        vehicle: null,
      };
    }

  saveWishList = (currentParams) => {
    const payload = {
      email: 'vincent.dv@gmail.com',
      currentParams,
      paramsStars : {},
    }

    Object.keys(currentParams).map(key => {
      payload.paramsStars[key] = getRandomInt(2,4);
    })

    axios.post(currentServer + ':3001/wishList', payload).then(() => {
      this.setState({
        isWaitingSuggest: true,
      }, () => this.pullSuggest());
    })
  }

  pullSuggest = () => {
    this.interval = setInterval(() => {
      this.setState({loading: true}, () => {
        axios.get(currentServer + ':3001/suggest')
        .then((response) => {
          if (response.data){
            if (response.data.vehicle) {
              this.setState({
                isWaitingSuggest: response.data.vehicle ? false : true,
                vehicle: response.data.vehicle,
                dealerName: response.data.dealerName,
              });
            }
            if(response.data) clearInterval(this.interval)
          }
        });
      });
    }, 2000);
  }

  render(){
    const { isWaitingSuggest, vehicle, dealerName } = this.state;
    const { currentParams } = this.props;

    if (isWaitingSuggest) {
      return (<div className="ContactForm"><div className="ContactForm__title">Waiting for Suggest</div></div>);
    } else if (vehicle) {
      return (
        <div>
          <div className="ContactForm__title">Dealer : {dealerName}</div>
          <div className="ContactForm"><VehicleItem vehicle={vehicle} /></div>
        </div>
      )
    } else {
      return (
        <div className="ContactForm">
          <div className="ContactForm__title">
            <span>My wishlist</span>
          </div>
          <div className="ContactForm__line ContactFrom__email">
            <label className="ContactForm__emailLabel" for="email">Email</label>
            <input className="ContactForm__emailInput" type="text" name="email" id="email" placeholder="vincent.dv@gmail.com"/>
          </div>
          <div className="ContactForm__line ContactForm__criteriasTitle">
            <span>Criteria</span>
            <span>Importance</span>
          </div>
          <ul className="ContactForm__criterias">
            { Object.keys(currentParams).map(key => (
                <li className="ContactForm__criteria">
                  <span className="ContactForm__tag">{interpolate(paramsMapping[key], { [key] : currentParams[key] })}</span>
                  <span className="ContactForm__star"><Star starKey={key}/></span>
                </li>
              ))
            }
          </ul>
          <div className="ContactForm__line ContactFrom__address">
            <label className="ContactForm__addressLabel" for="adress">Address</label>
            <input className="ContactForm__addressInput" type="text" name="address" id="address"/>
          </div>
          <div className="ContactForm__line ContactForm__validation">
            <button className="ContactForm__validationButton" onClick={() => this.saveWishList(currentParams)}>Confirm</button>
          </div>
        </div>
      )
    }
  }
}

export default ContactForm;
