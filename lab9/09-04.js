const http = require('http');

let json_str = JSON.stringify({x: 3, y: 4, s: 'xxx'});

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const req = http.request(options, (res) => {
    console.log('http.request: statusCode: ', res.statusCode);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk.toString('utf8');
    });

    res.on('end', () => {
        console.log('http.request: end: body: ', data);
        console.log('http.request: end: parse(body): ', JSON.parse(data));
    });
});

req.on('error', (err) => {
    console.log('http.request: error: ', err.message);
});

req.end(json_str);