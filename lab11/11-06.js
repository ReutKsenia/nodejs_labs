const rpcWSS = require('rpc-websockets').Server;
const readline = require('readline');

let server = new rpcWSS({port: 4000, host: 'localhost'});

server.event('A');
server.event('B');
server.event('C');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

console.log('Enter events A, B or C');
rl.on('line', function(line){
    server.emit(line);
});
