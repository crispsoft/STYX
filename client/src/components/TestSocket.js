import React, { Component } from 'react';

import openSocket from 'socket.io-client';

class TestSocket extends Component {
  state = {
    socket: openSocket('/'),
    connection: 'connecting...',
    gameReady: false,
    messages: []
  }

  componentWillMount() {
    //! needs a state refresh after connection is finished
    this.state.socket.on('connect', () => {
      this.setState({ connection: 'connected' })
    });


    this.state.socket.on('disconnect', () => {
      this.setState({ connection: 'no connection' })
    });

    this.state.socket.on('seat', index => {
      this.setState({ seatedAt: index+1 });
    });

    this.state.socket.on('ready', readyStatus => {
      this.setState({ gameReady: readyStatus })
    })

    this.state.socket.on('message', message => {
      const messages = [...this.state.messages];
      messages.unshift(message);
      this.setState({ messages });
    })

  }

  clickIt = () => this.state.socket.emit('click');

  render() {
    return (
      <>
        <p>{this.state.connection}</p> 

        {this.state.seatedAt &&
          <>
            <p>{this.state.seatedAt && `I am Player ${this.state.seatedAt}`}</p>
            <p>{this.state.gameReady ? "READY!" : "..hold on.."}</p>
            <button onClick={this.clickIt}>Click me</button>
            {this.state.messages.map((msg,idx) => (
              <p key={`msg-${idx}`}>{msg} has something to say</p>
            ))}
          </>
        }
       
      </>
    );
  }
}

export default TestSocket;