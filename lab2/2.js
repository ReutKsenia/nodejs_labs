var http = require("http");
var fs = require("fs");

const express = require("express");
const app = express();

app.get("/", function(request, response){
    response.statusCode = 404;
    response.end();
});

app.get("/html", function(request, response){
    let html = fs.readFileSync('./index.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
});

app.get("/png", function(request, response){
    const fname = './node.png';
    let jpg = null;

    fs.stat(fname, (err, stat)=>{
        if(err){console.log('error:',err);}
        else {
            jpg = fs.readFileSync(fname);
            response.writeHead(200, {'Content-Type': 'image/png', 'Content-Length':stat.size});
            response.end(jpg,'binary');
        }
    });
});

app.get("/api/name", function(request, response){
    response.setHeader('Content-Type', 'text/plain');
    response.end('Lesya');
});

app.get("/xmlhttprequest", function(request, response){
    let html = fs.readFileSync('./xmlhttprequest.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
});

app.get("/fetch", function(request, response){
    let html = fs.readFileSync('./fetch.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
});

app.get("/jquery", function(request, response){
    let html = fs.readFileSync('./jquery.html');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    response.end(html);
});

app.listen(5000);

console.log('Start server at http://localhost:5000/');
