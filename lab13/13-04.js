const net = require('net');

let HOST='0.0.0.0';
let PORT = 40000;

let client = new net.Socket();
let buf = new Buffer.alloc(4);
let timerId = null;

client.connect(PORT, HOST,()=>{
    let k =0;
    timerId=setInterval(()=>{
        client.write((buf.writeInt32LE(k++,0), buf));
    },1000);
    setTimeout(()=>{
        clearInterval(timerId);
        client.end();
        },20000);
});
client.on('data',(data)=>{
    console.log(data.readInt32LE())
});

client.on('close', ()=>{console.log('Client closed');});
client.on('error', (e)=>{console.log('Client error: ', e);});