import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Login} from './Login';
import {SignUp} from './SignUp';
import {UserEntry} from './UserEntry';

export class Authentication extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			login: false,
			usernameText: '',
			passwordText: ''
		}
	}

	handleClick(e) {
		this.setState({
			login: !this.state.login
		})
	}

  handleUserTextChange(e) {
  	this.setState({
  		usernameText: e.target.value
  	});
  }

	handlePasswordTextChange(e) {
		this.setState({
			passwordText: e.target.value
		});
	}

	render() {
		var pageToRender;
		var loginPage = !!this.state.login;

// Same as lets from App.js Component for consistency accross the App.
// Might want to look into doing a separate style sheet and importing the styles.
		let authStyle = {
		  margin: 'auto auto',
		  width: '80%',
		  height: '100%',
		  border: '1px solid black',
		  padding: '7%',
		  textAlign: 'center',
		  background: '#CCC',
		}

		let jumboStyle = {
			border: '1px solid black',
		}

// Render the Login Vs. SignUp based on state of this.state.login
		pageToRender = loginPage
		 ? (<Login 
		 	   signUp={this.handleClick.bind(this)}/>) 
		 : (<SignUp 
		 	   logIn={this.handleClick.bind(this)}/>);

		return (
			<div style={authStyle}>
			  <Jumbotron style={jumboStyle}>
			  <h1> Crumbs </h1>
			  <p> Authentication </p>
			  </Jumbotron>
			  <UserEntry
			    userChange={this.handleUserTextChange.bind(this)}
			    passwordChange={this.handlePasswordTextChange.bind(this)}
			    usernameText={this.state.usernameText}
			    passwordText={this.state.passwordText}
			  />
			  {pageToRender}
			</div>
		);
	}
}