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
      if(event.key == 'Enter'){
        console.log('enter press here! ', event.target.value)
        /*this.setState({
          criteria,
        });*/
      }
    }

    componentWillMount() {
      // TODO
    }


    render() {
      const { items } = this.state;
      return (
        <div className="ChatBot">
          <div className="ChatBot__chat">
            { items.map((item, index) => <Bubble key={`it-${index}`} isBot={item.isBot}>{item.entry}</Bubble>) }
            <Bubble>
              We are 5, 2 adults and 3 children
            </Bubble>
          </div>
          <div className="ChatBot__form">
            <input className="ChatBot__input" id="chat" placeholder="..." onKeyPress={this.handleKeyPress} />
          </div>
        </div>)
    }
};

export default ChatBot;
