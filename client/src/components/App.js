import $ from 'jquery';
import React from 'react';

import { ChatRoom } from './ChatRoom.js'
import { OutOfChatRoom } from './OutOfChatRoom.js'

import { EnterCrumb } from './EnterCrumb.js'
import { CrumbFeed } from './CrumbFeed.js'

class App extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			messages: null,
			lat: 0,
			lon: 0,
		}
	}

	componentWillMount() {
		this.getLocation();
	}

	//will watch our location and frequently call set position
	getLocation() {
		if ( navigator.geolocation ) {
			navigator.geolocation.watchPosition(this.setPosition.bind(this), this.error);
		} else {
			console.log("geolocation not supported")
		}
	}

	//will continulally update our location state with our new position returned form navigator.geolocation and check if we are in chat room
	setPosition(position) {
		this.setState({
			lat: position.coords.latitude,
			lon: position.coords.longitude
		})
	}

	//sends reqest with our location to server and will set App.state.messages null (not in chatroom) or an array of messages (in chatroom)
	checkIfInChatRoom() {
		var self = this;
		$.ajax({
		  url: "http://127.0.0.1:3000/",
		  type: "GET",
		  data: { location : [this.state.lat, this.state.lon] },
		  dataType: 'json',
		}).done(function(data) {
		  console.log('checkMessages success', data)
		  self.setState({
		  	messages: data.messages
		  })
		}).fail(function(err) {
		  console.log('checkMessages err', err)
		})
	}

	//sends a request with our location to server and return message will have an empty array which indicates and empty chat room
	createNewChatRoom() {
	  console.log('[this.state.lat, this.state.lon] ' , [this.state.lat, this.state.lon]);
		var self = this;
		$.ajax({
		  url: "http://127.0.0.1:3000/",
		  type: "POST",
		  data: { location : [this.state.lat, this.state.lon] },
		  dataType: 'json',
		  success: function(data) {
		    console.log('sendCreateNewRoom success', data)
	    	console.log('should return empty array', self.state.messages);
		    console.log('data ' , data.messages);
		    self.setState({
		    	messages: data.messages
		    })
		    console.log('still working')
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
      data: { location : [this.state.lat, this.state.lon], message: message },
      dataType: 'json',
    }).done(function(data) {
    	self.setState({
    		messages: data.messages
    	})
      console.log('sendAddNewMessage success', data)
    }).fail(function(err) {
      console.log('sendAddNewMessage err', err)
    })  
	}

	render() {
		var childToRender;
		var isInRoom = !!this.state.messages;
		// var isInRoom = false

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
