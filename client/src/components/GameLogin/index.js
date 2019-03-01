import React, { Component } from 'react';

import axios from 'axios';


import styled from 'styled-components';
import { offWhite } from './../../constants/colors';
const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
`;

const AuthLoginBox = styled.div`
  width: 35rem;

  margin-top: 5rem;
  padding-top: 10vh;
  padding-bottom: 10vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${offWhite};

  border-radius: 1rem;
`;

const AuthLoginHeader = styled.span`
  font-family: "Imprima", sans-serif;
  font-size: 3rem;
`;

const AuthLoginButton = styled.button`
  border-radius: 10px;
  font-family: "Imprima", sans-serif;
  width: 5rem;
  height: 3rem;
  background-color: #dd9933;
  margin: 10px;
`;

const AuthLoginInput = styled.input`
  border-radius: 10px;
  width: 10rem;
  height: 3rem;
  margin: 10px;
  padding: 10px;
`;


class GameLogin extends Component {
  autoFocusInput = React.createRef();

  state = {
    form: {}
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      form: {...this.state.form, 
        [name]: value
      }
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post('/admin/login', this.state.form)
      .then(this.props.onLogin)
      .catch(error => {})
    ; 

    this.setState({
      form: {}
    });
    this.autoFocusInput.current.focus();
  }

  render() {
    return (
      <Container>
        <AuthLoginBox>
          <AuthLoginHeader as="h2">Authorized Content</AuthLoginHeader>
          <p>Please enter your password to view the teaching guide.</p>

          <form onSubmit={this.handleFormSubmit}>

            <AuthLoginInput name='password'
              type='password'
              autoFocus ref={this.autoFocusInput}
              value={this.state.form.password || ''}
              onChange={this.handleInputChange}
            />

            <AuthLoginButton type="submit">Login</AuthLoginButton>

          </form>

        </AuthLoginBox>
      </Container>
    )
  }
}


export default GameLogin;
