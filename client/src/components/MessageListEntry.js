import React from 'react';
import Moment from 'moment';
import { ListGroupItem } from 'react-bootstrap';

export const MessageListEntry = (props) => (
  <ListGroupItem>
    {
      props.message.username + ' '
      + props.message.message + ' '
      + Moment(props.message.createdAt).fromNow()
    }
  </ListGroupItem>
);
