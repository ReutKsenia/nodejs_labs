const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({port: 4000, host: 'localhost'});

let k = 0;

wss.on('connection', (websocket) => {
   const duplex = WebSocket.createWebSocketStream(websocket, {encoding: 'utf-8'});
   const file = fs.createWriteStream(__dirname + `/upload/file${++k}.txt`);
   duplex.pipe(file);
});