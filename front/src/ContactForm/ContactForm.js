import React from 'react';
import interpolate from '../utils';
import paramsMapping from '../constants';
import Star from '../Star/Star';

import './ContactForm.css';

const ContactForm = ({currentParams, isDealer = false}) => (
  <div className="ContactForm">
    <div className="ContactForm__title">
    {!isDealer && <span>My wishlist</span>}
    {isDealer && <span>Client wishlist</span>}
    </div>
    <div className="ContactForm__line ContactFrom__email">
      <label className="ContactForm__emailLabel" for="email">Email</label>
      {!isDealer && <input className="ContactForm__emailInput" type="text" name="email" id="email"/>}
      {isDealer && <span className="ContactForm__emailInput">vincent.dv@gmail.com</span>}
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
      <button className="ContactForm__validationButton">Confirm</button>
    </div>
  </div>
);

export default ContactForm;
