import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Login} from './Login';
import {SignUp} from './SignUp';

export class Authentication extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			login: null,
		}
	}
	render() {
		var pageToRender;
		var loginPage = !!this.state.login;

// Copied from App.js Component for consistency accross the App.
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

		pageToRender = loginPage ? (<Login />) : (<SignUp />);
		return (
			<div style={authStyle}>
			  <Jumbotron style={jumboStyle}>
			  <h1> Crumbs </h1>
			  <p> Authentication </p>
			  </Jumbotron>
			  {pageToRender}
			</div>
		);
	}
}