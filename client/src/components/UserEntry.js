import React from 'react';

export class UserEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <input 
            onChange={this.props.userChange}
            value={this.props.usernameText}
            type="text" 
            placeholder="username"
          />
          <input 
            onChange={this.props.passwordChange}
            value={this.props.passwordText}
            type="password" 
            placeholder="password" 
          />
        </form>
      </div>
    )
  }
}