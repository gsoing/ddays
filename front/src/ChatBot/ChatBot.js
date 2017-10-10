import React, { Component } from 'react';

import Bubble from './Bubble/Bubble';
import './ChatBot.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

const QUESTIONS = [
  {
    question: "What is your maximum budget ?",
    context: "TODO"
  },
  {
    question: "Are you looking for your principal car or your secondary car ?",
    context: "TODO2"
  },
  {
    question: "Do you have children ?",
    context: "TODO3"
  },
  {
    question: "Do you want a big or a small trunk ?",
    context: "TODO4"
  },
  {
    question: "Do you live in a city or in the countryside ?",
    context: "TODO5"
  },
  {
    question: "Are you in a hurry for having your car?",
    context: "TODO6"
  }
];

class ChatBot extends Component {

    /**
     * @private
     */
    constructor(props) {
      super(props);

      this.state = {
        // Questions restantes
        questions: QUESTIONS,
         // Items affichés
        items: [
          {
            entry: "Hello ! Welcome to the car chooser",
            isBot: true,
          }
        ],
        currentQuestion: {}
      };
    }

    handleKeyPress = (event) => {
      if(event.key == 'Enter' && event.target.value !== ''){
        console.log('enter press here! ', event.target.value)

        const { questions, question } = this.getRandomQuestion();
        if (this.props.handleNewAnswer) {
          this.props.handleNewAnswer({lastAnswer: event.target.value, context: this.state.currentQuestion.context});
        }


        const answer = {
          entry: event.target.value,
          isBot: false,
        }

        this.setState({
          items: [
            ...this.state.items,
            answer,
            question
          ],
          questions,
          currentQuestion: question,
        });

        // Clean input
        event.target.value = '';
      }
    }

    getRandomQuestion = () => {
      const index = getRandomInt(0,this.state.questions.length-1);
      const question = this.state.questions[index].question;
      return {
        question : {
          entry: question,
          isBot: true,
        },
        questions: this.state.questions.filter(q => q.question != question),
      };

    }

    componentDidMount() {
      const { questions, question } = this.getRandomQuestion();
      this.setState({
        items: [...this.state.items, question],
        questions,
        currentQuestion: question,
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
