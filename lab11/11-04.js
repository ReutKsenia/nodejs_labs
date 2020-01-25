const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 4000, host: 'localhost'});

let n = 0;

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        let pdata = JSON.parse(data);
        console.log('on message: ', pdata);
        ws.send(JSON.stringify({server: ++n, client: pdata.client, timestamp: pdata.timestamp}));
    });
});

wss.on('error', (e) => {console.log('wss server error ', e);});