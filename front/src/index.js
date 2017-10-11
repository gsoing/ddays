import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppDealer from './AppDealer';
import registerServiceWorker from './registerServiceWorker';

if(window.location.href.indexOf('dealer') > -1) {
  ReactDOM.render(<AppDealer />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
registerServiceWorker();
