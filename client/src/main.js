import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import io from 'socket.io/node_modules/socket.io-client'

let demoSocket = io('http://localhost:8000')
let mainSocket = io('http://localhost:3000')

ReactDOM.render(
  <App mainSocket={mainSocket} demoSocket={demoSocket} />,
  document.getElementById('app')
);
