import React from 'react';

import './FunnelHeader.common.css';
import mainLogo from '../img/mainLogo.svg';

/**
 * Header content for the funnel
 * @param {string} title Header title
 */
const FunnelHeader = ({ title }) => (
  <header className="FunnelHeader">
    <span className="FunnelHeader__title">{title}</span>
    <span className="FunnelHeader__homelink">
      <img className="FunnelHeader__brand" src={mainLogo} />
    </span>
  </header>
);

export default FunnelHeader;