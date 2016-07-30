import React from 'react';
import { Authentication } from './Authentication';
import { Authenticated } from './Authenticated';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      userLoggedIn: !!localStorage.token,
      username: localStorage.token,
      center: { lat: 37.7821, lng: -122.4090 },
      zoom: 17,
      // homebase: '37.783-122.409',
      counter: 0,
      bankedCoins: [], // all banked coins added up
      carriedCoins: [], // all coins currently carried not in bank
      coinsOnMap: [], // all locations on map where there are coins
      homebase: '37.7837-122.4090',
    };
  }

  componentWillMount() {
    this.logOutUser = this.logOutUser.bind(this);
    this.getBankedCoins();
    this.getCoinsOnMap();
  }

  componentDidMount() {
    // const locationSource = this.getUserLocation.bind(this);
    const locationSource = this.getDaveLocation.bind(this);
    setInterval(locationSource, 1000);

    this.props.mainSocket.on('getBankedCoins', (myCoins) => {
      console.log('sending off for coins');       
      this.setState({
        bankedCoins: myCoins,
      });
    });

    //this is transferring all coins from user db to state
    this.props.mainSocket.on('getCoinsOnMap', (setCoins) => {
      // console.log('getting coinsOnMap back', setCoins);
      var that = this;
      let filteredCoinsOnMap = [];
      for (const coin of setCoins) {
        if (this.state.bankedCoins.indexOf(coin.location) < 0) {
          filteredCoinsOnMap.push(coin.location);
        }
      }
      this.setState({
        coinsOnMap: filteredCoinsOnMap,
      });
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
  updateCarriedCoins(location) {
    //updating carried coins with fixed3 location
    this.setState({
      carriedCoins: this.state.carriedCoins.concat([location])
    })
    //iterate through coinsOnMap and remove one that's been picked up
    for (var i = 0; i < this.state.coinsOnMap.length; i++) {
      //capture lat and long for fixed4-coinOnMap
      var tempLat = this.state.coinsOnMap[i].substring(0, 6);
      var tempLong = this.state.coinsOnMap[i].substring(7, 15);
      //capture lat and long for fixed3-current location
      var currLat = location.substring(0, 6);
      var currLong = location.substring(6, 14);
      
      // console.log('coin location: ', tempLat, tempLong)
      // console.log('curr location: ', currLat, currLong)

      if (tempLat === currLat && tempLong === currLong) {
        var firstHalf = this.state.coinsOnMap.slice(0, i);
        var secondHalf = this.state.coinsOnMap.slice(i + 1);
        var newCoinsOnMap = firstHalf.concat(secondHalf);
        this.setState({
          coinsOnMap: newCoinsOnMap
        })
        // console.log('current coinsOnMap: ' + this.state.coinsOnMap)
        // console.log('updated carriedCoins: ', this.state.carriedCoins)
        // console.log('updated bankedCoins: ', this.state.bankedCoins)
      }
    }
  }
  
  updateTreasureState() {
    //capture location in state
    var stateLat = this.state.location.substring(0, 6);
    var stateLong = this.state.location.substring(7, 15);
    if (this.state.coinsOnMap.length) {
      for (var i = 0; i < this.state.coinsOnMap.length; i++) {
        var chestLat = this.state.coinsOnMap[i].substring(0, 6);
        var chestLong = this.state.coinsOnMap[i].substring(7, 15);

        if (chestLat === stateLat && chestLong === stateLong) {
          console.log('Treasure!')
          var truncLocation = String(stateLat) + String(stateLong);
          this.updateCarriedCoins(truncLocation);
        }
      }
    } 
    // console.log('trying to check if I should bank or not - 37.783, -122.409')
    console.log(stateLat + ' ' + stateLong)
    if ('37.783' === stateLat && '-122.409' === stateLong) {
      if (this.state.carriedCoins.length > 0) {
        console.log('Banking: ', this.state.carriedCoins)
        this.bankCoins();
      } else {
        console.log('nada to bank, loser')
      }
    }
  }

  getBankedCoins() {
    this.props.mainSocket.emit('getBankedCoins', { username: this.state.username })
  }

  getCoinsOnMap() {
    this.props.mainSocket.emit('getCoinsOnMap');
  }

  bankCoins() {
    // console.log('banking!')
    var newObj = { username: this.state.username, coins: this.state.carriedCoins }
    this.props.mainSocket.emit('updateBankedCoins', newObj);
    this.setState({
      bankedCoins:  this.state.bankedCoins.concat(this.state.carriedCoins),
      carriedCoins: [],
    })
  }


  setPosition(position) {
    const latRound = position.coords.latitude.toFixed(4);
    const lonRound = position.coords.longitude.toFixed(4);
    const location = latRound.toString() + lonRound.toString();
    this.setState({
      location,
    });
    // console.log('setPos location fixed to 4: ', location)
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

  getDaveLocation() {
    //lat bigger as you go up
    // long bigger as you go left

    const locs = [
    '37.7809-122.4120',
      '37.7814-122.4119',
      '37.7819-122.4116',
      '37.7824-122.4111',
      '37.7824-122.4107',
      '37.7824-122.4105',
    '37.7829-122.4101',
    '37.7829-122.4101',

      '37.7833-122.4098',
      '37.7834-122.4096',
      '37.7836-122.4095',
      '37.7839-122.4095',
      '37.7841-122.4094',
    '37.7842-122.4093',
    '37.7850-122.4093',

      '37.7847-122.4093',
      '37.7843-122.4092',
      '37.7842-122.4092',
      '37.7840-122.4092',
      '37.7839-122.4091',
    '37.7837-122.4090',
    '37.7837-122.4090',
    
      '37.7839-122.4084',
      '37.7841-122.4080',
      '37.7842-122.4079',
      '37.7843-122.4078',
    '37.7849-122.4075',
    '37.7849-122.4075',
    
      '37.7843-122.4076',
      '37.7838-122.4077',
      '37.7835-122.4078',
      '37.7834-122.4078',
    '37.7829-122.4079',
    '37.7829-122.4079',
    
      '37.7831-122.4080',
      '37.7833-122.4082',
      '37.7834-122.4083',
      '37.7835-122.4085',
    '37.7836-122.4090',
    '37.7834-122.4092',
    '37.7838-122.4092'
    ]
    if (this.state.counter > 40) {
      console.log('end of loop')
      this.setState({
        location: locs[40]
      })
    } else {
      this.setState({
        location: locs[this.state.counter]
      })
      this.setState({
        counter: this.state.counter+1
      })
    }

    this.updateTreasureState();
  }

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
        userLoggedIn={this.state.userLoggedIn}
        logOutUser={this.logOutUser}
        zoom={this.state.zoom}
        center={this.state.center}
        coinsOnMap={this.state.coinsOnMap}
        carriedCoins={this.state.carriedCoins}
        bankedCoins={this.state.bankedCoins}
        homebase={this.state.homebase}
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
