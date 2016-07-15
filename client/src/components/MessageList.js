import React from 'react';
import { MessageListEntry } from './MessageListEntry'

export let MessageList = ({messages}) => (
  <div>
    { messages.map((message) => (<MessageListEntry message={message}/>)) }
  </div>
)