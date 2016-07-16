import React from 'react';

import { PageHeader, Footer } from 'react-bootstrap';

import { AddMessage } from './AddMessage';
import { MessageList } from './MessageList';


export class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <AddMessage addMessageToChatRoom={this.props.addMessageToChatRoom}/>
      <MessageList messages={this.props.messages}/>
      </div>
    )
  }
}
