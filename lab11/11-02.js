const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({port: 4000, host: 'localhost'});

wss.on('connection', (websocket) => {
    const duplex = WebSocket.createWebSocketStream(websocket, {encoding: 'utf-8'});
    const file = fs.createReadStream(`./download/MyFile.txt`);
    file.pipe(duplex);
});