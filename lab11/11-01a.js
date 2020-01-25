const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000/');
const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf-8'});
const file = fs.createReadStream('./MyFile.txt');

file.pipe(duplex);