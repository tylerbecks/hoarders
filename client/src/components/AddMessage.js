import React from 'react';

export class AddMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  handleInputChange (e) {
    this.setState({
      message: e.target.value
    })
    console.log('this.state.message ' , this.state.message);
  }

  render() {
    return (
      <div>
        <input onChange={this.handleInputChange.bind(this)} placeholder="enter new message" type="text" value={this.state.message}></input>
      </div>  
    )
  }
}
