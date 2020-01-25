const http = require("http");
var state = '<h1>Norm<h1>';

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(state);
}).listen(5000);

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>{
    let chunk = null;   
    while ((chunk = process.stdin.read()) != null){
        if (chunk.trim() == 'exit') process.exit(0);
        else if (chunk.trim() == 'norm') state = '<h1>Norm<h1>';
        else if (chunk.trim() == 'stop') state = '<h1>Stop<h1>';
        else if (chunk.trim() == 'test') state = '<h1>Test<h1>';
        else if (chunk.trim() == 'idle') state = '<h1>Idle<h1>';
        else process.stdout.write(chunk);
    }
});

console.log('Start server at http://localhost:5000/');