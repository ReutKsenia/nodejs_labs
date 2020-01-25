const rpcWSC = require('rpc-websockets').Client;
const readline = require('readline');

let ws = new rpcWSC('ws://localhost:4000/');

let k = 0;

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

ws.on('open', () => {
    console.log('Enter notify A, B or C');
    rl.on('line', function(line){
        ws.notify(line);
    });
});