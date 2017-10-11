import React from 'react';
import interpolate from '../utils';
import paramsMapping from '../constants';
import Star from '../Star/Star';

import './ContactForm.css';

const ContactForm = ({currentParams}) => (
  <div className="ContactForm">
    <div className="ContactForm__line ContactFrom__email">
      <label className="ContactForm__emailLabel" for="email">Email :</label>
      <input className="ContactForm__emailInput" type="text" name="email" id="email"/>
    </div>
    <div className="ContactForm__line ContactForm__criteriasTitle">
      <span>My wishlist</span>
      <span>Criteria importance</span>
    </div>
    <ul className="ContactForm__criterias">
      { Object.keys(currentParams).map(key => (
          <li className="ContactForm__criteria">
            <span>
              <span className="ContactForm__tag">{interpolate(paramsMapping[key], { [key] : currentParams[key] })}</span>
            </span>
            <span>
              <Star starKey={key}/>
            </span>
          </li>
        ))
      }
    </ul>
  </div>
);

export default ContactForm;
