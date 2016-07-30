import React from 'react';
import { homebaseStyle, outerHomebaseDivStyle } from './treasureStyle.js';

export default class SkateSpot extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={outerHomebaseDivStyle}>
        <div style={homebaseStyle(this.props.bankedCoins.length)}>
        </div>
      </div>
    );
  }
}
