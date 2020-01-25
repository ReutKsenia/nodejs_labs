var http = require('http');
var fs = require('fs');

http.createServer(function (require, response)
{
  let html = fs.readFileSync('./name.txt');
  response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
  response.end(html);
}).listen(5000);

console.log('Server running at http://localhost:5000/api/name');
