import React from 'react';
import interpolate from '../utils';
import { paramsMapping } from '../constants';
import Star from '../Star/Star';

import './SuggestForm.css';

const SuggestForm = ({currentParams, isDealer = false}) => (
  <div className="SuggestForm">
    <div className="SuggestForm__title">
    {!isDealer && <span>My wishlist</span>}
    {isDealer && <span>Client wishlist</span>}
    </div>
    <div className="SuggestForm__line ContactFrom__email">
      <label className="ContactForm__emailLabel" for="email">Email</label>
      {!isDealer && <input className="ContactForm__emailInput" type="text" name="email" id="email"/>}
      {isDealer && <span className="ContactForm__emailInput">vincent.dv@gmail.com</span>}
    </div>
    <div className="SuggestForm__line SuggestForm__criteriasTitle">
      <span>Criteria</span>
      <span>Importance</span>
    </div>
    <ul className="SuggestForm__criterias">
      { Object.keys(currentParams).map(key => (
          <li className="SuggestForm__criteria">
            <span className="SuggestForm__tag">{interpolate(paramsMapping[key], { [key] : currentParams[key] })}</span>
            <span className="SuggestForm__star"><Star starKey={key}/></span>
          </li>
        ))
      }
    </ul>
    <div className="SuggestForm__line ContactForm__validation">
      <button className="SuggestForm__validationButton">Confirm</button>
    </div>
  </div>
);

export default SuggestForm;
