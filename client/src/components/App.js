import React from 'react';
import { Authentication } from './Authentication';
import { Authenticated } from './Authenticated';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      location: '37.7837-122.4090',
      demoMode: true,
      userLoggedIn: true,
      center: { lat: 37.75, lng: -122.44 },
      zoom: 13,
    };
  }

  componentWillMount() {
    this.addMessageToChatRoom = this.addMessageToChatRoom.bind(this);
    this.createChatRoom = this.createChatRoom.bind(this);
    this.logOutUser = this.logOutUser.bind(this);

    //selects and executes which source to use for setting the location state of application: demo or html5 nav
    const locationSource = !!this.state.demoMode
      ? this.updateLocationStateDemo.bind(this)
      : this.updateLocationState.bind(this);
    setInterval(locationSource, 500);

    //listens for a location update from the demo server
    this.props.demoSocket.on('updateLocationStateDemo', (data) => {
      const position = {};
      position.coords = {};
      position.coords.latitude = data.lat;
      position.coords.longitude = data.lon;
      this.setPosition(position);
    });

    //listens for a messages update from the main server
    this.props.mainSocket.on('updateMessagesState', (location) => {
      const messages = location ? location.messages : null;
      this.setState({
        messages,
      });
    });

    this.props.mainSocket.on('Authentication', (user) => {
      this.setState({
        userLoggedIn: user,
      });
    });
  }

  //will continulally update our location state with our new position returned form navigator.geolocation and check if we are in chat room
  setPosition(position) {
    const latRound = position.coords.latitude.toFixed(3);
    const lonRound = position.coords.longitude.toFixed(3);
    const location = latRound.toString() + lonRound.toString();
    this.setState({
      location,
    });
    this.updateMessagesState();
  }

  //will watch our location and frequently call set position
  updateLocationState() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.error);
    } else {
      console.log('geolocation not supported');
    }
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
    this.props.mainSocket.emit('addMessageToChatRoom', { location: this.state.location, message, username: this.state.userLoggedIn });
  }

  logOutUser() {
    this.setState({
      userLoggedIn: false,
    });
  }

  render() {
    const loggedIn = (
      <Authenticated
        messages={this.state.messages}
        userLoggedIn={this.state.userLoggedIn}
        addMessageToChatRoom={this.addMessageToChatRoom}
        createChatRoom={this.createChatRoom}
        logOutUser={this.logOutUser}
        zoom={this.state.zoom}
        center={this.state.center}
      />
    );

    const notLoggedIn = (
      <Authentication
        mainSocket={this.props.mainSocket}
      />
    );

    let childToRender = !!this.state.userLoggedIn ? loggedIn : notLoggedIn;

    return (
      <div>
        {childToRender}
      </div>
    );
  }
}
