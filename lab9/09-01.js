const http = require('http');

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log('http.request: statusCode: ', res.statusCode);
    console.log('http.request: statusMessage: ', res.statusMessage);
    console.log('http.request: socket.remoteAddress: ', res.socket.remoteAddress);
    console.log('http.request: socket.remotePort: ', res.socket.remotePort);

    let data = '';

    res.on('data', (chunk) => {
        console.log('http.request: data: body: ', data += chunk.toString('utf8'));
    });

    res.on('end', () => {
        console.log('http.request: end: body: ', data);
    });
});

req.on('error', (err) => {
    console.log('http.request: error: ', err.message);
});

req.end();