import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import io from 'socket.io/node_modules/socket.io-client';
// import io from 'socket.io-client';

const mainSocket = io('http://localhost:3000');

ReactDOM.render(
  <App mainSocket={mainSocket} />,
  document.getElementById('app')
);
