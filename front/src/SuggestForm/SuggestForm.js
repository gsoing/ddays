import React, {Component} from 'react';
import interpolate from '../utils';
import { paramsMapping } from '../constants';
import Star from '../Star/Star';
import axios from 'axios';

import './SuggestForm.css';

class SuggestForm extends Component {

    /**
     * @private
     */
    constructor(props) {
      super(props);

      this.state = {
        email: null,
        currentParams: {},
        paramsStars: {},
        loading: true,
      };
    }

    componentDidMount(){
      this.interval = setInterval(() => {
        this.setState({loading: true}, () => {
          axios.get('http://localhost:3001/wishList')
          .then((response) => {
            this.setState({
              currentParams: response.data ? response.data.currentParams : {},
              paramsStars: response.data ? response.data.paramsStars : {},
              email: response.data ? response.data.email : null,
              loading: false,
            });
            if(response.data) clearInterval(this.interval)
          });
        });
      }, 2000);
    }

    render() {
      if (!this.state.email) {
        return <div className="SuggestForm"><div className="SuggestForm__title">Waiting for wishlist</div></div>;
      } else {
        return (
          <div className="SuggestForm">
            <div className="SuggestForm__title">
              <span>Client wishlist</span>
            </div>
          <div className="SuggestForm__line ContactFrom__email">
            <label className="ContactForm__emailLabel" for="email">Email</label>
            <span className="ContactForm__emailInput">{this.state.email}</span>
          </div>
          <div className="SuggestForm__line SuggestForm__criteriasTitle">
            <span>Criteria</span>
            <span>Importance</span>
          </div>
          <ul className="SuggestForm__criterias">
            { Object.keys(this.state.currentParams).map(key => (
                <li className="SuggestForm__criteria">
                  <span className="SuggestForm__tag">{interpolate(paramsMapping[key], { [key] : this.state.currentParams[key] })}</span>
                  <span className="SuggestForm__star"><Star starKey={key} value={this.state.paramsStars[key]}/></span>
                </li>
              ))
            }
          </ul>
          <div className="SuggestForm__line ContactForm__validation">
            <button className="SuggestForm__validationButton">Confirm</button>
          </div>
        </div>
        );
      }
    }
  }

export default SuggestForm;
