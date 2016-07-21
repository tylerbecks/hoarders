import React from 'react';
import Moment from 'moment';

import { Panel, ListGroupItem } from 'react-bootstrap';

export let MessageListEntry = ({message}) => (
  <ListGroupItem> { message.username + ' ' + message.message + ' ' + Moment(message.createdAt).fromNow() } </ListGroupItem>
)