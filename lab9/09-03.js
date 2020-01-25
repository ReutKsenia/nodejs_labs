const http = require('http');
const querystring = require('querystring');

let parms = querystring.stringify({x: 3, y: 4, s: 'xxx'});

console.log('parms', parms);

let options = {
    host: 'localhost',
    path: '/mypath',
    port: 5000,
    method: 'POST'
};

const req = http.request(options, (res) => {
    console.log('http.request: statusCode: ', res.statusCode);

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

req.write(parms);

req.end();