import { Button } from 'react-bootstrap';

var style = {
  margin: 'auto auto',
  height: '100%',
}

export let OutOfChatRoom = ({createChatRoom}) => (
  <div style={style}>
    <h2>you are not in a Chatroom!</h2>
    <br />
    <p>create a chatroom at this spot to start a thread. Leave a message for someone else to find later!</p>
    <br />
    <Button bsStyle="primary" onClick={createChatRoom}>Create a new Chatroom!</Button>
    <br />
    <br />
  </div>
)