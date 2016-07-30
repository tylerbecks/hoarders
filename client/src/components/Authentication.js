import React from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';

export class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
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

  handleClick(e) {
    e.preventDefault();
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
  validateUserLogin(e) {
    e.preventDefault();
    this.props.mainSocket.emit('validateUserLogin',
      { username: this.state.usernameText,
        password: this.state.passwordText });
  }

  validateUserSignup(e) {
    e.preventDefault();
    this.props.mainSocket.emit('validateUserSignup',
      { username: this.state.usernameText,
        password: this.state.passwordText });
  }

  render() {
    const login = (
      <Login
        validateUserLogin={this.validateUserLogin}
        signUp={this.handleClick}
        userChange={this.handleUserTextChange}
        passwordChange={this.handlePasswordTextChange}
        usernameText={this.state.usernameText}
        passwordText={this.state.passwordText}
      />
    );

    const signup = (
      <SignUp
        validateUserSignup={this.validateUserSignup}
        logIn={this.handleClick}
        userChange={this.handleUserTextChange}
        passwordChange={this.handlePasswordTextChange}
        usernameText={this.state.usernameText}
        passwordText={this.state.passwordText}
      />
    );

    const pageToRender = !!this.state.login ? login : signup;

    return (
      <div className="homepage-hero-module">
        <div className="video-container">
          <div className="filter"></div>
          <video autoPlay loop className="fillWidth">
            <source src="../resources/Lonely-Chair/MP4/Lonely-Chair.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
            <source src="../resources/Lonely-Chair/WEBM/Lonely-Chair.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
          </video>
          <div className="poster hidden">
            <img src="../resources/Lonely-Chair/Snapshots/Lonely-Chair.jpg" alt="" />
          </div>
          <div className="showDammit">
            {pageToRender}
          </div>
        </div>
      </div>
    );
  }
}
