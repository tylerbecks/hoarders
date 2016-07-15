import React from 'react';
import { EnterCrumb } from './EnterCrumb.js'
import { CrumbFeed } from './CrumbFeed.js'

class App extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			crumbs: [],
			token: true,
			lat: 0,
			lng: 0
		}

	}

	setPosition(position) {
		this.setState({
			lat: position.coords.latitude,
			lng: position.coords.longitude
		})
	}

	error(err){
		console.log(err);
	}

	getLocation() {
		console.log(navigator.geolocation);
		if ( navigator.geolocation) {
			navigator.geolocation.watchPosition(this.setPosition.bind(this), this.error);
		} else {
			console.log("geolocation not supported")
		}
	}


	componentWillMount() {
		this.getLocation();
		console.log('fire');

	}

	handleClick(e) {
		this.setState({
			token: !this.state.token
		});
	}

	AddCrumb(crumb) {
		var self = this;
		$.ajax({
          url: "http://127.0.0.1:3000/",
          type: "PUT",
          data: { location : [1, 1], message: crumb },
          dataType: 'json',
        }).done(function(data) {
        	self.setState({
        		crumbs: data.messages
        	})
          console.log('sendAddNewMessage success', data)
        }).fail(function(err) {
          console.log('sendAddNewMessage err', err)
        })  

		
	}

	render(){
		if ( this.state.token === true ) {
		return (
		  <div>
		  	<EnterCrumb />
		  	<div>
		  	<CrumbFeed crumbs={this.state.crumbs} />
		  	</div>
		  	<button onClick={this.handleClick.bind(this)}>test</button>
		  </div>
		);
		} else {
			return (
				<div>
					<h1>Success</h1>
					<button onClick={this.handleClick.bind(this)}>test</button>
				</div>);
		}
	}
}

export default App