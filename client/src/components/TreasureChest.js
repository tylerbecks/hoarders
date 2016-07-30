import React from 'react';
import { outerDivStyle, newChestStyle } from './treasureStyle.js';

export default class Coin extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={outerDivStyle}>
        <div style={newChestStyle}>
        </div>
      </div>
    );
  }
}
