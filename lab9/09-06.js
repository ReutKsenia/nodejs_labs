const http = require('http');
const fs = require('fs');

let bound = 'mys';
let body = `--${bound}\r\n`;
    body += 'Content-Disposition: form-data; name="file"; filename="MyFile.txt"\r\n';
    body += 'Content-Type: text/plain\r\n\r\n';
    body += fs.readFileSync('./MyFile.txt');
    body += `\r\n--${bound}--\r\n`;

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=' + bound
    }
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

req.end(body);