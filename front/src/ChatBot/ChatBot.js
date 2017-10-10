import React, { Component } from 'react';

import Bubble from './Bubble/Bubble';
import './ChatBot.css';

class ChatBot extends Component {

    /**
     * @private
     */
    constructor(props) {
      super(props);

      this.state = {
        items: [
          {
            entry: "Hello ! Welcome to the car chooser",
            isBot: true,
          },
          {
            entry: "How many people live in your house ?",
            isBot: true,
          }
        ]
      };
    }

    handleKeyPress = (event) => {
      if(event.key == 'Enter' && event.target.value !== ''){
        console.log('enter press here! ', event.target.value)
        this.setState({
          items: [...this.state.items, {
            entry: event.target.value,
            isBot: false,
          }],
        });
        if (this.props.handleNewAnswer) {
          this.props.handleNewAnswer(event.target.value);
        }
        event.target.value = '';
      }
    }

    getRandomQuestion = () => {

    }

    render() {
      const { items } = this.state;
      return (
        <div className="ChatBot">
          <div className="ChatBot__chat">
            { items.map((item, index) => <Bubble key={`it-${index}`} isBot={item.isBot}>{item.entry}</Bubble>) }
          </div>
          <div className="ChatBot__form">
            <input className="ChatBot__input" id="chat" placeholder="..." onKeyPress={this.handleKeyPress} />
          </div>
        </div>)
    }
};

export default ChatBot;
