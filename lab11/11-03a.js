const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000/');
const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});

duplex.pipe(process.stdout);
