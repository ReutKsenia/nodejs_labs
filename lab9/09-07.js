const http = require('http');
const fs = require('fs');

let bound = 'mys';
let body = `--${bound}\r\n`;
body += 'Content-Disposition: form-data; name="file"; filename="MyFile.png"\r\n';
body += 'Content-Type: application/octet-stream\r\n\r\n';

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
        console.log('http.request: data: body: ', data += chunk);
    });

    res.on('end', () => {
        console.log('http.request: end: length body = ', Buffer.byteLength(data));
    });
});

req.on('error', (err) => {
    console.log('http.request: error: ', err.message);
});

req.write(body);

let stream = fs.ReadStream('./MyFile.png');

stream.on('data', (chunk) => {
   req.write(chunk);
   console.log(Buffer.byteLength(chunk));
});

stream.on('end', () => {
   req.end(`\r\n--${bound}--\r\n`);
});