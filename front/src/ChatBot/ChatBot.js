import React, { Component } from 'react';

import Bubble from './Bubble/Bubble';
import './ChatBot.css';

class ChatBot extends Component {
    render() {
      return (
        <div className="ChatBot">
          <div className="ChatBot__chat">
            <Bubble isBot>
              Hello ! Welcome to the car chooser
            </Bubble>
            <Bubble isBot>
              How many people live in your house
            </Bubble>
            <Bubble>
              We are 5, 2 adults and 3 children
            </Bubble>
          </div>
          <div className="ChatBot__form">
            <input className="ChatBot__input" placeholder="..." />
          </div>
        </div>)
    }
};

export default ChatBot;
