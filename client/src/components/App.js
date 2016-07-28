import React from 'react';
import { Authentication } from './Authentication';
import { Authenticated } from './Authenticated';



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      location: '37.7835-122.4096',
      // demoMode: true,
      userLoggedIn: !!localStorage.token,
      username: '',
      center: { lat: 37.7843, lng: -122.4096 },
      zoom: 17,
      counter: 0.0001,
      score: 0,
      treasureChestData: [],
    };
  }

  componentWillMount() {
    this.logOutUser = this.logOutUser.bind(this);

    this.getTreasureChests();

    this.getUserScore();
    // selects and executes which source to use for setting the location state of
    // user.
  }

componentDidMount() {
    const locationSource = this.updateLocationState.bind(this);
    setInterval(locationSource, 2000);


    this.props.mainSocket.on('getUserScore', (score) => {
      this.setState({
        score: score
      })
    });

    this.props.mainSocket.on('getTreasureChests', (chests) => {
      this.setState({ treasureChestData: chests })
    })

    this.props.mainSocket.on('updateUserPoints', (results) => {
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
    if (this.state.treasureChestData.length) {
      for (var i = 0; i < this.state.treasureChestData.length; i++) {
        console.log('eoiutpwoireut',this.state.location)
        console.log('kajdfhglakdjf',this.state.treasureChestData[i].location)
        // var newLocA = this.state.location.substring(0, 7);
        // var newLocB = this.state.location.substring(8, 17);
        // var newLoc = String(newLocA) + String(newLocB);
        if (this.state.location === this.state.treasureChestData[i].location) {
        console.log('state: ', this.state.location, ' chest: ', this.state.treasureChestData[i].location);
          this.updateUserPoints();
        }
      }
    }
  }

  getUserScore() {
    this.props.mainSocket.emit('getUserScore', {username: this.state.username});
  }

  getTreasureChests() {
    this.props.mainSocket.emit('getTreasureChests');
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
    console.log('setPos msetting this in state: ', location)
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
    console.log('updating location state!');
    var dummyLat = 37.7843;
    var dummyLon = -122.4102;
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
        username={this.state.username}
        dummyLat={Number(this.state.location.slice(0,7))}
        dummyLong={-122.4096}
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
