import React from 'react';
import GoogleMap from 'google-map-react';
import UserSpot from './userSpot.js';


export default class OurMap extends React.Component {
  constructor(props) {
    super(props);
  }

  createMapOptions(maps) {
    return {
      styles: [{"featureType":"landscape","stylers":[{"hue":"#FFAD00"},{"saturation":50.2},{"lightness":-34.8},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFAD00"},{"saturation":-19.8},{"lightness":-1.8},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FFAD00"},{"saturation":72.4},{"lightness":-32.6},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FFAD00"},{"saturation":74.4},{"lightness":-18},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00FFA6"},{"saturation":-63.2},{"lightness":38},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#FFC300"},{"saturation":54.2},{"lightness":-14.4},{"gamma":1}]}]
    };
  }

  render() {
    // google map component from google-map-react
    return (
      <GoogleMap bootstrapURLKeys={{ key: 'AIzaSyDZjkD659gGlpyUKXU14_Tomji58BSfI0A', language: 'en' }} options={this.createMapOptions} center={this.props.center} zoom={this.props.zoom} >
        <UserSpot user={'Davey'} lat={37.799} lng={-122.434} />
      </GoogleMap>
    );
  }

}
