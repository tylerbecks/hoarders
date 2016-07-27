import React from 'react';
import { ChatRoom } from './ChatRoom.js';
import { OutOfChatRoom } from './OutOfChatRoom.js';
import OurMap from './map.js';
// import { Jumbotron, Button } from 'react-bootstrap';

export const Authenticated = (props) => {
  const appStyle = {
    margin: 'auto auto',
    width: '80%',
    height: '100%',
    border: '1px solid black',
    padding: '7%',
    textAlign: 'center',
    background: '#CCC',
  };

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

  const childToRender = !!props.messages ? chatRoom : outOfChatRoom;


  // return (
  //   <div style={appStyle}>
  //     <Button
  //       style={{ float: 'right' }}
  //       bsStyle="link"
  //       onClick={props.logOutUser}
  //     >
  //       Logout
  //     </Button>
  //     <div>
  //       <Jumbotron>
  //         <h1>Crumbs</h1>
  //         <p>your local chatroom</p>
  //       </Jumbotron>
  //       {childToRender}
  //     </div>
  //   </div>
  // );

  var ourMap;
  var mapStyle = { height: screen.height - (0.15 * screen.height) };

  //render the map in all cases
  var googleMap = <div className='map-wrapper' style={mapStyle}>
                    <OurMap center={props.center} zoom={props.zoom} />
                  </div>

  ourMap = <div className='col-xs-12 wrapper'>
            {googleMap}
           </div>;

  return (
    <div>
      {ourMap}
    </div>
  );

};
