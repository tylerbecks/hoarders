export let OutOfChatRoom = ({createNewChatRoom}) => (
  <div>
    <h2>Out of chat room header</h2>
    <button onClick={createNewChatRoom}/>
    <h2>Out of chat room footer</h2>
  </div>
)