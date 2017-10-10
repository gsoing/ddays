
import React from 'react';

import './Loader.css';
import mainLogo from '../img/mainLogo.svg';

const Loader = ({loading}) => {
  if (loading) {
    return  (<div class="load-bar">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>);
  } else {
    return (<div class="load-bar-hidden"></div>);
  }
};

export default Loader;
