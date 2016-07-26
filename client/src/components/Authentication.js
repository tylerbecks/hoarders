import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { UserEntry } from './UserEntry';

export class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      usernameText: '',
      passwordText: '',
    };
  }

  componentWillMount() {
    this.validateUserSignup = this.validateUserSignup.bind(this);
    this.validateUserLogin = this.validateUserLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUserTextChange = this.handleUserTextChange.bind(this);
    this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
  }

  handleClick() {
    this.setState({
      login: !this.state.login,
    });
  }

  handleUserTextChange(e) {
    this.setState({
      usernameText: e.target.value,
    });
  }

  handlePasswordTextChange(e) {
    this.setState({
      passwordText: e.target.value,
    });
  }

  // Pass down clickhandler to Login

  validateUserLogin() {
    this.props.mainSocket.emit('validateUserLogin', { username: this.state.usernameText, password: this.state.passwordText });
  }

  validateUserSignup() {
    this.props.mainSocket.emit('validateUserSignup', { username: this.state.usernameText, password: this.state.passwordText });
  }

  render() {
    const authStyle = {
      margin: 'auto auto',
      width: '80%',
      height: '100%',
      border: '1px solid black',
      padding: '7%',
      textAlign: 'center',
      background: '#CCC',
    };

    const jumboStyle = {
      border: '1px solid black',
    };

    const login = (
      <Login
        validateUserLogin={this.validateUserLogin}
        signUp={this.handleClick}
      />
    );

    const signup = (
      <SignUp
        validateUserSignup={this.validateUserSignup}
        logIn={this.handleClick}
      />
    );

    const pageToRender = !!this.state.login ? login : signup;

    return (
      <div style={authStyle}>
        <Jumbotron style={jumboStyle}>
          <h1> Crumbs </h1>
          <p> Authentication </p>
        </Jumbotron>
        <UserEntry
          userChange={this.handleUserTextChange}
          passwordChange={this.handlePasswordTextChange}
          usernameText={this.state.usernameText}
          passwordText={this.state.passwordText}
        />
        {pageToRender}
      </div>
    );
  }
}
