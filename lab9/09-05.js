const http = require('http');
const xmlbuilder = require('xmlbuilder');
const parse_string = require('xml2js').parseString;

let xmlDoc = xmlbuilder.create('response').att('request', 5).ele('sum').att('element', 'x').att('result', 69);

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'text/xml',
        'Accept': 'text/xml'
    }
};

const req = http.request(options, (res) => {
    console.log('http.request: statusCode: ', res.statusCode);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('http.request: end: body: ', data);
        parse_string(data, (err, str) => {
            if (err) {
                console.log('xml parse error');
            } else {
                console.log('str = ', str);
                console.log('str.result = ', str.result);
            }
        });
    });
});

req.on('error', (err) => {
    console.log('http.request: error: ', err.message);
});

req.end(xmlDoc.toString({pretty: true}));