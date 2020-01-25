const websocket = require('ws');

let ws = new websocket('ws://localhost:4000/wsserver');

let k = 0;

ws.on('open', () => {
    let timer = setInterval(() => {
        ws.send(`10-01-client: ${++k}`);
    }, 3000);
    setInterval(() => {
        clearInterval(timer);
        ws.close();
    }, 25000);
   ws.on('message', (message) => {
       console.log('Received message -> ', message);
   });
});
ws.on('close', () => {console.log('socket close')});