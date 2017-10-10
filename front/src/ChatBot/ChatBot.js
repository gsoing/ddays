import React, { Component } from 'react';

import Bubble from './Bubble/Bubble';
import './ChatBot.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

const QUESTIONS = [
  {
    question: "Yo youy you",
  },
  {
    question: "Yo youy you 2",
  },
  {
    question: "Yo youy you 3",
  },
  {
    question: "Yo youy you 4",
  },
  {
    question: "Yo youy you 5",
  }
];

class ChatBot extends Component {

    /**
     * @private
     */
    constructor(props) {
      super(props);

      this.state = {
        questions: QUESTIONS,
        items: [
          {
            entry: "Hello ! Welcome to the car chooser",
            isBot: true,
          }
        ]
      };
    }

    handleKeyPress = (event) => {
      if(event.key == 'Enter' && event.target.value !== ''){
        console.log('enter press here! ', event.target.value)
        this.setState({
          items: [
            ...this.state.items,
            {
              entry: event.target.value,
              isBot: false,
            },
            this.getRandomQuestion()
          ],
        });
        if (this.props.handleNewAnswer) {
          this.props.handleNewAnswer(event.target.value);
        }
        event.target.value = '';
        this.getRandomQuestion();
      }
    }

    getRandomQuestion = () => {
      const index = getRandomInt(0,this.state.questions.length-1);
      return {
        entry: this.state.questions[index].question,
        isBot: true,
      };

    }

    componentDidMount() {
      this.setState({
        items: [...this.state.items, this.getRandomQuestion()]
      });
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
