const net = require('net');

let HOST='127.0.0.1';
let PORT=40000;
let client = new net.Socket();

client.connect(PORT, HOST,()=>{
    client.write('Hello');
});

client.on('data',(data)=>{
    console.log(data.toString());
    client.destroy();
});