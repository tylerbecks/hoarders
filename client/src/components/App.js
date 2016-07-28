import React from 'react';
import { Authentication } from './Authentication';
import { Authenticated } from './Authenticated';

const dummyData = [
  {
    name: '',
    lat: 37.7847,
    lng: -122.4090,
    address: '',
    shortDescription: '',
    detailedDescription: '',
    bust: 'hello hello',
    comments: [],
    checkin: [],
    loc: '37.7847-122.4090'
  },
  {
    name: '',
    lat: 37.7837,
    lng: -122.4090,
    address: '',
    shortDescription: '',
    detailedDescription: '',
    bust: 'hello hello',
    comments: [],
    checkin: [],
    loc: '37.7837-122.4090'
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      location: '37.7835-122.4096',
      // demoMode: true,
      userLoggedIn: !!localStorage.token,
      username: 'Tyler',
      center: { lat: 37.7810, lng: -122.4096 },
      zoom: 15,
      counter: 0.0001,
      score: 0,
      treasureChestData: dummyData,
    };
  }

  componentWillMount() {
    this.logOutUser = this.logOutUser.bind(this);

    this.getUserScore();
    this.props.mainSocket.on('getUserScore', (score) => {
      this.setState({
        score: score
      })
    });
    // selects and executes which source to use for setting the location state of
    // user.
    const locationSource = this.updateLocationState.bind(this);
    //const locationSource = this.getUserLocation.bind(this);
    setInterval(locationSource, 400);

    // this.props.mainSocket.on('updateTreasureState', (location) => {
    //   if (location) {
    //     this.updateUserPoints();
    //   }
    // });

    this.props.mainSocket.on('updateUserPoints', (results) => {
      console.log(' the results are', results);
      if (results) {
        this.state.score++;
      }
    });

    this.props.mainSocket.on('Authentication', (userDetails) => {
      if (userDetails) {
        this.setState({
          userLoggedIn: true,
          username: userDetails.username,
        });
        localStorage.token = userDetails.username;
      }
    });
  }
  
  updateTreasureState () {
    if (dummyData.length) {
      for (var i = 0; i < dummyData.length; i++) {
        if (this.state.location === dummyData[i].loc) {
          console.log('IM IN');
          this.updateUserPoints();
        }
      }
    }
  }

  getUserScore() {
    this.props.mainSocket.emit('getUserScore', {username: this.state.username});
  }

  updateUserPoints() {
    var userObj = { username: this.state.username, location: this.state.location };

    this.props.mainSocket.emit('updateUserPoints', userObj);
  }
  // will continually update our location state with our new position
  // returned from navigator.geolocation and check if we are in chat room
  setPosition(position) {
    const latRound = position.coords.latitude.toFixed(4);
    const lonRound = position.coords.longitude.toFixed(4);
    const location = latRound.toString() + lonRound.toString();
    this.setState({
      location,
    });
    this.updateTreasureState();
  }

  getUserLocation() {
    const that = this; 

    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      navigator.geolocation.getCurrentPosition((position, error) => {
        that.setPosition(position);
      });
    }
  }

  //will watch our location and frequently call set position
  updateLocationState() {
    // need this, every individual call to move
    var dummyLat = 37.7843;
    var dummyLon = -122.4090;
    let position = {};
    position.coords = {};
    position.coords.latitude = dummyLat + this.state.counter;
    position.coords.longitude = dummyLon;
    this.setPosition(position);
    var reCount = this.state.counter + 0.0001;
    this.setState({
      counter: reCount,
    });
  }

  // socket request to the main server to update messages state based on location state
  // updateTreasureState() {
  //   this.props.mainSocket.emit('updateTreasureState', this.state.location);
  // }

  logOutUser(e) {
    e.preventDefault();
    this.setState({
      userLoggedIn: false,
    });
    delete localStorage.token;
  }

  render() {
    const loggedIn = (
      <Authenticated
        dummyLat={Number(this.state.location.slice(0, 6))}
        dummyLong={-122.4096}
        username={this.state.username}
        messages={this.state.messages}
        userLoggedIn={this.state.userLoggedIn}
        addMessageToChatRoom={this.addMessageToChatRoom}
        createChatRoom={this.createChatRoom}
        logOutUser={this.logOutUser}
        zoom={this.state.zoom}
        center={this.state.center}
        treasureChestData={this.state.treasureChestData}
        score={this.state.score}
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
