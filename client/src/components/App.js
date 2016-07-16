import $ from 'jquery';
import React from 'react';

import { ChatRoom } from './ChatRoom.js'
import { OutOfChatRoom } from './OutOfChatRoom.js'

class App extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			messages: null,
			location: "37.7837-122.4090",
			demoMode: false,
		}
	}

	componentWillMount() {
		this.checkIfInChatRoom()
		if (this.state.demoMode) {
			setInterval(this.getDemoLocation.bind(this), 500)
		} else {
			setInterval(this.getLocation.bind(this), 500);
		}
	}

	getDemoLocation() {
		var self = this;
		var position = {};
		position.coords = {};
		$.ajax({
		  url: "http://127.0.0.1:8000/demo",
		  type: "GET",
		  data: { location : this.state.location },
		  dataType: 'json',
		}).done(function(data) {
			position.coords.latitude = data.lat;
			position.coords.longitude = data.lon;
			console.log('position', position)
			self.setPosition(position);
		}).fail(function(err) {
		  console.log('checkMessages err', err)
		})
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
		this.checkIfInChatRoom()
	}

	//sends reqest with our location to server and will set App.state.messages null (not in chatroom) or an array of messages (in chatroom)
	checkIfInChatRoom() {
		var self = this;
		$.ajax({
		  url: "http://127.0.0.1:3000/location",
		  type: "GET",
		  data: { location : this.state.location },
		  dataType: 'json',
		}).done(function(data) {
		  self.setState({
		  	messages: data.messages
		  })
		}).fail(function(err) {
		  console.log('checkMessages err', err)
		})
	}

	//sends a request with our location to server and return message will have an empty array which indicates and empty chat room
	createNewChatRoom() {
		var self = this;
		$.ajax({
		  url: "http://127.0.0.1:3000/",
		  type: "POST",
		  data: { location : this.state.location },
		  dataType: 'json',
		  success: function(data) {
		    self.setState({
		    	messages: data.messages
		    })
		  },
		  error: function(err) {
		    console.log('sendCreateNewRoom err', err)
		  },
		})  
	}

	//sends a request to server with our location and message and will append message to the db
	addMessageToChatRoom(message) {
		var self = this;
		$.ajax({
      url: "http://127.0.0.1:3000/",
      type: "PUT",
      data: { location : this.state.location, message: message },
      dataType: 'json',
    }).done(function(data) {
    	self.setState({
    		messages: data.messages
    	})
    }).fail(function(err) {
      console.log('sendAddNewMessage err', err)
    })  
	}

	render() {
		var childToRender;
		var isInRoom = !!this.state.messages;

		childToRender = isInRoom	
			? (<ChatRoom
					messages={this.state.messages}
					addMessageToChatRoom={this.addMessageToChatRoom.bind(this)}
				/>)
			: (<OutOfChatRoom
				  createNewChatRoom={this.createNewChatRoom.bind(this)}
				/>);

		return (
			<div>
				<h1>Crumbs Header here</h1>
				{childToRender}
				<h3>Crumbs Footer here</h3>
			</div>
		);
	}
}

export default App;
