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
  }

  handleSubmit () {
    this.props.addMessageToChatRoom(this.state.message);
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleInputChange.bind(this)} placeholder="enter new message" type="text" value={this.state.message}></input>
        <button onClick={this.handleSubmit.bind(this)}>Add message</button>
      </div>  
    )
  }
}
