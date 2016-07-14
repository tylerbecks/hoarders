import React from 'react';
import { EnterCrumb } from './EnterCrumb.js'
import { CrumbFeed } from './CrumbFeed.js'

class App extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			crumbs: ['hello', 'bread', 'crumbs'],
			token: true,
			lat: 39.01,
			lng: 140.21
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
			navigator.geolocation.getCurrentPosition(this.setPosition, this.error);
		} else {
			console.log("geolocation not supported")
		}
	}


	componentDidMount() {
		this.getLocation();
		console.log('fire');

	}

	handleClick(e) {
		this.setState({
			token: !this.state.token
		});
	}

	AddCrumb(crumb) {
		this.setState({
			crumbs: this.state.crumbs.concat([crumb])
		});
	}

	render(){
		if ( this.state.token === true ) {
		return (
		  <div>
		  	<h1>LAT {this.state.lat}</h1>
		  	<h1>LNG {this.state.lng}</h1>
		  	<div>
		  	<EnterCrumb addCrumb={this.AddCrumb.bind(this)} />
		  	</div>
		  	<div>
		  	<CrumbFeed crumbs={this.state.crumbs} />
		  	</div>
		  	<button onClick={this.handleClick.bind(this)}>test </button>
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