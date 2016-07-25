import React from 'react';
import { ChatRoom } from './ChatRoom.js';
import { OutOfChatRoom } from './OutOfChatRoom.js';
import { Jumbotron, Button } from 'react-bootstrap';

export const Authenticated = (props) => {
  const chatRoom = (
    <ChatRoom
      messages={props.messages}
      user={props.userLoggedIn}
      addMessageToChatRoom={props.addMessageToChatRoom}
    />
  );

  const outOfChatRoom = (
    <OutOfChatRoom
      createChatRoom={props.createChatRoom}
    />
  );

  let childToRender = !!props.messages ? chatRoom : outOfChatRoom;

  let appStyle = {
    margin: 'auto auto',
    width: '80%',
    height: '100%',
    border: '1px solid black',
    padding: '7%',
    textAlign: 'center',
    background: '#CCC',
  };

  return (
    <div style={appStyle}>
      <Button
        style={{ float: 'right' }}
        bsStyle="link"
        onClick={props.logOutUser}
      >
        Logout
      </Button>
      <div>
        <Jumbotron>
          <h1>Crumbs</h1>
          <p>your local chatroom</p>
        </Jumbotron>
        {childToRender}
      </div>
    </div>
  );
};