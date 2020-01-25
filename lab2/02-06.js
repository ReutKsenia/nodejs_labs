var http = require('http');
var url = require('url');
var fs = require('fs');

let HTTP404 = (req, res) => {
    console.log(`${req.method}: ${req.url}, HTTP status 404`);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h3>Error: ${req.method}: ${req.url}, HTTP status 404</h3>`);
}

http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/jquery') {
        let html = fs.readFileSync('./jquery.html');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(html);
    }
    else if(url.parse(request.url).pathname === '/api/name'){
        response.setHeader('Content-Type', 'text/plain');
        response.end('Lesya');
    }
    else HTTP404(request, response);
}).listen(5000)
    .on('error', (e) => { console.log(`${URL} | error: ${e.code}`) });

console.log('Server running at http://localhost:5000/');

