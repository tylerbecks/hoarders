import React from 'react';

import { Panel, ListGroup } from 'react-bootstrap';

import { MessageListEntry } from './MessageListEntry'

export let MessageList = ({messages}) => (
  <Panel style={{fontWeight: 'bold'}} header="Chatroom messages">
    <ListGroup fill>
      { messages.map((message) => (<MessageListEntry message={message}/>)) }
    </ListGroup>
  </Panel>
)