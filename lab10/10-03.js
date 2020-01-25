const websocket = require('ws');

let wss = new websocket.Server({port: 5000, host: 'localhost', path: '/broadcast'});

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
       wss.clients.forEach((client) => {
           if (client.readyState === websocket.OPEN) {
               client.send('server: ' + data);
           }
       });
    });
});