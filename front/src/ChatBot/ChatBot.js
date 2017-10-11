import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Bubble from './Bubble/Bubble';
import './ChatBot.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

const QUESTIONS = [
  {
    question: "Do you have children ?",
    context: "CHILDREN"
  },
  {
    question: "Will you use your car daily or for hobby ?",
    context: "USE"
  },
  {
    question: "How many kilometers do you drive per year ?",
    context: "FAMILYGROW"
  },
  {
    question: "Do you want to save the planet ?",
    context: "ECOLO"
  },
  {
    question: "What's your favorite hobby ?",
    context: "HOBBY"
  },
  {
    question: "Do you live in a city or in the countryside ?",
    context: "CITY"
  },
  {
    question: "What is your maximum budget ?",
    context: "PRICE"
  }
];

const LASTQUESTION = {
  question: "Have you found something interesting ?",
  context: "LASTQUESTION"
}

const LASTQUESTION2 = {
  question: "Do you want to submit a whishlist to the nearest dealer ?",
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

    scrollToBottom = () => {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
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
      const lastAnswer = event.target.value;
      if(event.key == 'Enter' && lastAnswer !== ''){
        console.log('enter press here! ', event.target.value)

        const { questions, question } = this.getRandomQuestion();
        if (this.props.handleNewAnswer) {
          console.log(this.state)
          this.props.handleNewAnswer({lastAnswer: lastAnswer, context: this.state.currentQuestion.context});
        }

        const answer = {
          entry: lastAnswer,
          isBot: false,
        }

        this.addEntry(false, answer, null, () => {
          if(this.state.currentQuestion.context === LASTQUESTION.context && lastAnswer.toUpperCase().indexOf('YES') > -1) {
            this.setState({
                items: [...this.state.items, {
                  entry: "Cool !",
                  isBot: true,
                }],
                isInputVisible: false,
              });
          }
          else if(this.state.currentQuestion.context === LASTQUESTION2.context && lastAnswer.toUpperCase().indexOf('NO') > -1) {
            this.setState({
                items: [...this.state.items, {
                  entry: "Sorry !",
                  isBot: true,
                }],
                isInputVisible: false,
              });
          }
          else if(this.state.currentQuestion.context !== LASTQUESTION2.context) {
            setTimeout(
              () => { this.addEntry(true, question, questions, () => true) },
              500,
            );
          } else {
            this.setState({
              items: [...this.state.items, {
                entry: "Could you fill the form please, you'll be contact as soon as possible",
                isBot: true,
              }],
              isInputVisible: false,
            });
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
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
          <div className="ChatBot__form">
            { this.state.isInputVisible && <input className="ChatBot__input" id="chat" placeholder="..." onKeyPress={this.handleKeyPress} /> }
          </div>
        </div>)
    }
};

export default ChatBot;
