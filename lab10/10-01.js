const http = require('http');
const ws = require('ws');
const fs = require('fs');

let errorHandler = (req, res) => {
    res.writeHead(400, {'Content-Type':'text/html; charset=utf-8'});
    res.end('<h1>Error 400</h1>')
};

let httpServer = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/start') {
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
        fs.readFile('./10-01.html', (err, data) => {
            if(err) {
                errorHandler(req, res);
            } else {
                res.end(data);
            }
        });
    } else {
        errorHandler(req, res);
    }
}).listen(3000);

let k = 0;
let n = 0;

let wsServer = new ws.Server({port: 4000, host: 'localhost', path: '/wsserver'});

wsServer.on('connection', (ws) => {
   ws.on('message', (message) => {
       console.log(`Received message -> ${message}`);
       n = message.match(/\d+$/);
   });
   setInterval(() => {ws.send(`10-01-server: ${n}->${++k}`);}, 5000);
});

wsServer.on('error', (e) => {console.log('wsServer error', e);});

console.log('Http server running on http://localhost:3000/');
console.log(`WS server running on ${wsServer.options.host}, port ${wsServer.options.port}, path ${wsServer.options.path}`);