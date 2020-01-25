const net = require('net');
let HOST='0.0.0.0';
let PORT = 40000;

net.createServer((socket => {
    socket.on('data',(data)=>{
        console.log(data.toString());
        socket.write('ECHO'+data)
    });
})).listen(PORT, HOST);