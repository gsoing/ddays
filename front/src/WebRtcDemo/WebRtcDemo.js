import React, {Component} from 'react';
import { currentServer } from '../constants';

class WebRtcDemo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (<iframe width="100%" height={this.props.height || '500px'} src={`${currentServer}:8001/#room/webrtc`}></iframe>);
  };
}

export default WebRtcDemo;
