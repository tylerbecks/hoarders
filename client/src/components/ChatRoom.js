import React from 'react';

import { AddMessage } from './AddMessage';
import { MessageList } from './MessageList';


export class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h1>Chat Room component</h1>
      <AddMessage addMessageToChatRoom={this.props.addMessageToChatRoom}/>
      <MessageList messages={this.props.messages}/>
      <h2>Chat Room footer</h2>
      </div>
    )
  }
}
