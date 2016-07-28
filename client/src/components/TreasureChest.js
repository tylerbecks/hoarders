import React from 'react';
import { treasureChestHoverStyle, treasureChestStyle, outerDivStyle } from './treasureStyle.js';

export default class SkateSpot extends React.Component {

  constructor(props) {
    super(props);
  }

  // spotOnClick() {
  //   this.props.clickNav(4, this.props.treasureChestStyle);
  // }

  render() {
    // $hover is a built-in property on child elements of google map wrapper
    // const style = this.props.$hover ? treasureChestHoverStyle : treasureChestStyle;
    // const toolTip = this.props.$hover ? <Tooltip treasureChestData={this.props.treasureChestData} /> : '';

    return (
      <div style={outerDivStyle}>
        {'Sunny'}
        <div style={treasureChestStyle} >
        </div>
      </div>
    );
  }
}
