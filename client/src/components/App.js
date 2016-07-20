import $ from 'jquery';
import React from 'react';

import { Jumbotron } from 'react-bootstrap';

import { ChatRoom } from './ChatRoom.js'
import { OutOfChatRoom } from './OutOfChatRoom.js'

class App extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			messages: null,
			location: "37.7837-122.4090",
			demoMode: true,
		}
	}

	componentWillMount() {
		//Selects the source that the app is fetching location from

		if (!!this.state.demoMode) {
		  setInterval(this.updateLocationStateDemo.bind(this), 500)
		} else {
		  setInterval(this.getLocation.bind(this), 500);
		}

		//Sets up all the socket event listeners for the app
		var self = this;

		//shortcuts for both sockets
		var demo = this.props.demoSocket;
		var main = this.props.mainSocket;

		//listens for a location update from the demo server
		demo.on('updateLocationStateDemo', function(data) {
			var position = {};
			position.coords = {};
			position.coords.latitude = data.lat;
			position.coords.longitude = data.lon;
			self.setPosition(position);
		})

		//listens for a messages update from the main server
		main.on('updateMessagesState', function(location) {
			console.log('location ' , location);
			var messages = location ? location.messages : null;
			self.setState({
				messages: messages
			})	
		})
	}

	//socket request to demo server to update the state of the location of the app
	updateLocationStateDemo() {
		this.props.demoSocket.emit('updateLocationStateDemo', null);
	}

	//socket request to the main server to update messages state based on location state
	updateMessagesState() {
		this.props.mainSocket.emit('updateMessagesState', this.state.location);
	}

	//socket request to the main server to create a new chatroom
	createChatRoom() {
		this.props.mainSocket.emit('createChatRoom', this.state.location);
	}
	
	//socket request to chatroom to append a new message to
	addMessageToChatRoom(message) {
		this.props.mainSocket.emit('addMessageToChatRoom', {location: this.state.location, message: message});
	}

	//will watch our location and frequently call set position
	getLocation() {
		if ( navigator.geolocation ) {
			navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.error);
		} else {
			console.log("geolocation not supported")
		}
	}

	//will continulally update our location state with our new position returned form navigator.geolocation and check if we are in chat room
	setPosition(position) {
		var latRound = position.coords.latitude.toFixed(3)
		var lonRound = position.coords.longitude.toFixed(3)
		var location = latRound.toString() + lonRound.toString()
		this.setState({
			location: location,
		})
		this.updateMessagesState()
	}

	//sends reqest with our location to server and will set App.state.messages null (not in chatroom) or an array of messages (in chatroom)


	//sends a request to server with our location and message and will append message to the db

	render() {
		var childToRender;
		var isInRoom = !!this.state.messages;

		childToRender = isInRoom	
			? (<ChatRoom
					messages={this.state.messages}
					addMessageToChatRoom={this.addMessageToChatRoom.bind(this)}
				/>)
			: (<OutOfChatRoom
				  createChatRoom={this.createChatRoom.bind(this)}
				/>);

		let appStyle = {
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

		return (
			<div style={appStyle}>
				<Jumbotron style={jumboStyle}>
					<h1>crumbs</h1>
					<p>your local chatroom</p>
				</Jumbotron>
				{childToRender}
			</div>
		);
	}
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 46ff866e885e8ec4d1f4db19d7de8d90146c4b8d
