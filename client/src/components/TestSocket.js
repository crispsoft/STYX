import React, { Component } from 'react';

import openSocket from 'socket.io-client';

class TestSocket extends Component {
  state = {
    socket: openSocket('/')
  }

  componentWillMount() {
    //! needs a state refresh after connection is finished
    this.state.socket.on('connect', () => {
      this.setState({})
    })
  }

  render() {
    return (
      <p>{this.state.socket.id}</p>
    );
  }
}

export default TestSocket;