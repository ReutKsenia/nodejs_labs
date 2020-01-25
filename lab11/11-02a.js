const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000/');
const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});

duplex.pipe(process.stdout);

