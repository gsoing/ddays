import React from 'react';

import './FunnelHeader.css';
import mainLogo from '../img/mainLogo.svg';

const FunnelHeader = ({ title, isDealer }) => {

  const classNames = !isDealer ? "FunnelHeader" : "FunnelHeader FunnelHeader__dealer";
  return (<header className={classNames}>
    <span className="FunnelHeader__title">{title}</span>
    <span className="FunnelHeader__homelink">
      <img className="FunnelHeader__brand" src={!isDealer ? mainLogo : '/dealerLogo.png'} />
    </span>
  </header>);
};

export default FunnelHeader;
