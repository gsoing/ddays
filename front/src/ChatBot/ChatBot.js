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
  /*{
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
  }*/
];

const LASTQUESTION = {
  question: "Have you found something interesting ?",
  context: "LASTQUESTION"
}

const LASTQUESTION2 = {
  question: "Do you want to contact all the dealers ?",
  context: "LASTQUESTION2"
}

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
        currentQuestion: {},
        isInputVisible: true,
      };
    }

    addEntry = (isQuestion, entry, questions, callback) => {
      let currentQuestion = QUESTIONS.find(q => q.question === entry.entry);
      if (!currentQuestion && LASTQUESTION.question === entry.entry) currentQuestion = LASTQUESTION;
      if (!currentQuestion && LASTQUESTION2.question === entry.entry) currentQuestion = LASTQUESTION2;
      console.log('currentQuestion', currentQuestion)
      if(isQuestion) {
        this.setState(
          {
            items: [...this.state.items, entry],
            questions,
            currentQuestion,
          },
          callback
        );
      } else {
        this.setState(
          {
            items: [...this.state.items, entry],
          },
          callback
        );
      }
    }

    handleKeyPress = (event) => {
      if(event.key == 'Enter' && event.target.value !== ''){
        console.log('enter press here! ', event.target.value)

        const { questions, question } = this.getRandomQuestion();
        if (this.props.handleNewAnswer) {
          console.log(this.state)
          this.props.handleNewAnswer({lastAnswer: event.target.value, context: this.state.currentQuestion.context});
        }

        const answer = {
          entry: event.target.value,
          isBot: false,
        }

        this.addEntry(false, answer, null, () => {
          if(this.state.currentQuestion.context !== LASTQUESTION2.context) {
            setTimeout(
              () => { this.addEntry(true, question, questions, () => true) },
              500,
            );
          } else {
            this.setState({ isInputVisible: false }, () => this.setState(
              {
                items: [...this.state.items, {
                  entry: "Sorry !",
                  isBot: true,
                }],
              }));
          }
         } )

        // Clean input
        event.target.value = '';
      }
    }

    getRandomQuestion = () => {
      if (this.state.questions.length) {
        const index = getRandomInt(0,this.state.questions.length-1);
        const question = this.state.questions[index].question;
        return {
          question : {
            entry: question,
            isBot: true,
          },
          questions: this.state.questions.filter(q => q.question != question),
        };
      } else if(this.state.currentQuestion.context !== LASTQUESTION.context) {
        return {
          question : {
            entry: LASTQUESTION.question,
            isBot: true,
          },
          questions: []
        };
      } else {
        return {
          question : {
            entry: LASTQUESTION2.question,
            isBot: true,
          },
          questions: []
        };
      }
    }

    componentDidMount() {
      const { questions, question } = this.getRandomQuestion();
      this.addEntry(true, question, questions, () => true);
    }

    render() {
      const { items } = this.state;
      return (
        <div className="ChatBot">
          <div className="ChatBot__chat">
            { items.map((item, index) => <Bubble key={`it-${index}`} isBot={item.isBot}>{item.entry}</Bubble>) }
          </div>
          <div className="ChatBot__form">
            { this.state.isInputVisible && <input className="ChatBot__input" id="chat" placeholder="..." onKeyPress={this.handleKeyPress} /> }
          </div>
        </div>)
    }
};

export default ChatBot;
