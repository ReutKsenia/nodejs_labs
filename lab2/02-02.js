var http = require('http');
var fs = require('fs');

http.createServer(function (request, response)
{
  const pngf = './node.png';
  let png = null;
  fs.stat(pngf, (err, stat) =>
  {
    if(err){console.log('error', err);}
    else
    {
      png = fs.readFileSync(pngf);
      response.writeHead(200, {'Content-Type':'image/png', 'Content-Length':stat.size});
      response.end(png, 'binary');
    }
  });
}).listen(5000);

console.log('Server running at http://localhost:5000/png');
