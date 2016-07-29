import React from 'react';
import { Authentication } from './Authentication';
import { Authenticated } from './Authenticated';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      // location: '37.78352-122.40962',
      location: '37.7821-122.4090',
      userLoggedIn: !!localStorage.token,
      username: localStorage.token,
      center: { lat: 37.7821, lng: -122.4090 },
      zoom: 17,
      // homebase: '37.7837-122.4090',
      homebase: '37.7851-122.4101',
      hoard: 0,
      counter: 0.0001,
      score: 0,
      treasureChestData: [],
      userChests: {},
    };
  }

  componentWillMount() {
    this.logOutUser = this.logOutUser.bind(this);
    this.getTreasureChests();
    this.getUserScore();
    this.getUserChests();
    // selects and executes which source to use for setting the location state of user.
  }

  componentDidMount() {
    // const locationSource = this.updateLocationState.bind(this);
    const locationSource = this.getUserLocation.bind(this);
    setInterval(locationSource, 5000);
    this.props.mainSocket.on('getUserScore', (score) => {
      this.setState({
        score: score,
      });
    });

    this.props.mainSocket.on('getUserChests', (chests) => {
      let chestObj = {};
      for (const chest of chests) {
        chestObj[chest] = true;
      }
      this.setState({
        userChests: chestObj,
      });
      console.log('UserChests: ', this.state.userChests);
    });

    this.props.mainSocket.on('getTreasureChests', (chests) => {
      this.setState({ treasureChestData: chests });
    });

    this.props.mainSocket.on('updateUserPoints', (results) => {
      console.log('coming back to update points!', results)
      if (results) {
        this.state.score++;
        console.log('getting user chests')
        this.getUserChests();
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

  updateTreasureState() {
    if (this.state.treasureChestData.length) {
      for (var i = 0; i < this.state.treasureChestData.length; i++) {

        var chestLat = this.state.treasureChestData[i].location.slice(0, 6);
        var chestLong = this.state.treasureChestData[i].location.slice(7, 15);
        var stateLat = this.state.location.slice(0, 6);
        var stateLong = this.state.location.slice(7, 15);

        // console.log('chest: ', chestLat, chestLong)
        // console.log('state: ', stateLat, stateLong)
        if ( ( stateLat > (chestLat-5) && stateLat < (chestLat+5) ) 
           &&
           ( stateLong > (chestLong-5) && stateLong < (chestLong+5) ) ) {
          console.log('in range! Calling updateUserPoints')
            this.updateUserPoints();
        }



        // if (this.state.location === this.state.homebase) {
        //   this.bankYourMoney();
        //   return;
        // } else {

            // console.log('user     location: ', this.state.location);
            // console.log('treasure location: ', this.state.treasureChestData[i].location);
          // if (this.state.location === this.state.treasureChestData[i].location) {
          //   console.log('shbooooooooooooooooooooooooooooooooooooooom!')
          // }
        // }
      }
    }
  }

  bankYourMoney() {
    this.setState({
      hoard: this.state.hoard = this.state.score,
      score: 0,
    })
    //if score is greater than X, do something/change something
    console.log('Your new hoard balance is: ', this.state.hoard)
  }

  stealYourMoney() {
    this.setState({
      score: 0,
    })
  }

  getUserScore() {
    this.props.mainSocket.emit('getUserScore', { username: this.state.username });
  }

  getUserChests() {
    this.props.mainSocket.emit('getUserChests', { username: this.state.username });
  }

  getTreasureChests() {
    this.props.mainSocket.emit('getTreasureChests');
  }

  updateUserPoints() {

    //saving treasurechest as a fixed(3)
    var stateLat = this.state.location.substring(0, 6);
    var stateLong = this.state.location.substring(7, 15);
    var newLocation = String(stateLat) + String(stateLong);
    var userObj = { username: this.state.username, location: newLocation };
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

  // will watch our location and frequently call set position
  // updateLocationState() {
  //   // need this, every individual call to move
  //   var dummyLat = 37.7820;
  //   var dummyLon = -122.4101;
  //   let position = {};
  //   position.coords = {};
  //   position.coords.latitude = dummyLat + this.state.counter;
  //   position.coords.longitude = dummyLon;
  //   this.setPosition(position);
  //   var reCount = this.state.counter + 0.0001;
  //   this.setState({
  //     counter: reCount,
  //   });
  // }

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
        username={this.state.username}
        dummyLat={Number(this.state.location.slice(0, 7))}
        dummyLong={Number(this.state.location.slice(7))}
        // dummyLong={-122.4093}
        messages={this.state.messages}
        userLoggedIn={this.state.userLoggedIn}
        addMessageToChatRoom={this.addMessageToChatRoom}
        createChatRoom={this.createChatRoom}
        logOutUser={this.logOutUser}
        zoom={this.state.zoom}
        center={this.state.center}
        treasureChestData={this.state.treasureChestData}
        score={this.state.score}
        userChests={this.state.userChests}
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
