const udp = require('dgram');
const buffer = require('buffer');
const PORT=3000;
const client = udp.createSocket('udp4');
client.on('message',(msg, info)=> {
    console.log(msg.toString());
});
let data = Buffer.from('Client: сообщение 01');
client.send(data, PORT,'localhost',(err)=>{
    if(err) client.close();
});

let data1 = Buffer.from('Привет ');
let data2 = Buffer.from(' мир');
client.send([data1,data2], PORT,'localhost',(err)=>{if(err) client.close()});