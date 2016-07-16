import React from 'react';

import { Panel, ListGroupItem } from 'react-bootstrap';

export let MessageListEntry = ({message}) => (
  <ListGroupItem> { message } </ListGroupItem>
)