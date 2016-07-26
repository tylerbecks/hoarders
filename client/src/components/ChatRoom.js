import React from 'react';
import { AddMessage } from './AddMessage';
import { MessageList } from './MessageList';


export const ChatRoom = (props) => (
  <div>
    <AddMessage addMessageToChatRoom={props.addMessageToChatRoom} />
    <MessageList messages={props.messages} />
  </div>
);
