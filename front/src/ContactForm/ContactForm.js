import React from 'react';
import interpolate from '../utils';
import axios from 'axios';
import { paramsMapping, urlWishList } from '../constants';
import Star from '../Star/Star';

import './ContactForm.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

const saveWishList = (currentParams) => {
  const payload = {
    email: 'vincent.dv@gmail.com',
    currentParams,
    paramsStars : {},
  }

  Object.keys(currentParams).map(key => {
    payload.paramsStars[key] = getRandomInt(2,4);
  })

  axios.post(urlWishList, payload);
}


const ContactForm = ({currentParams}) => (
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
    <div className="ContactForm__line ContactForm__validation">
      <button className="ContactForm__validationButton" onClick={() => saveWishList(currentParams)}>Confirm</button>
    </div>
  </div>
);

export default ContactForm;
