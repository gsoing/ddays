
import React from 'react';

import './Loader.css';
import mainLogo from '../img/mainLogo.svg';

const Loader = ({loading}) => {
  if (loading) {
    return  (<div className="load-bar">&nbsp;
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>);
  } else {
    return (<div className="load-bar-hidden">&nbsp;</div>);
  }
};

export default Loader;
