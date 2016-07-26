import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { MessageListEntry } from './MessageListEntry';

export const MessageList = (props) => (
  <Panel style={{ fontWeight: 'bold' }} header="Chatroom messages">
    <ListGroup fill>
      {props.messages.map((message) => (
        <MessageListEntry message={message} />)
      )}
    </ListGroup>
  </Panel>
);
