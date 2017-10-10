import React, { Component } from 'react';

import './Bubble.css';

const Bubble = ({ isBot, children }) => {
  const classNames = isBot ? "Bubble Bubble--bot" : "Bubble Bubble--client";
    return (<div className={classNames}>
            <div className="Bubble__inner">
              {children}
              <div className="Bubble__tick"></div>
            </div>

          </div>)
};

export default Bubble;
