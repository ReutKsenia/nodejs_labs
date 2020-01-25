const http = require("http");
const url = require("url");
const fs = require("fs");
const { parse } = require("querystring");
const send = require("./m06-03/m06-03.js");

let s = http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === "/") {
        let html = fs.readFileSync("./index.html");
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(html);
    }
    else if (url.parse(request.url).pathname === "/mail") {       
        let body = "";
        request.on("data", data => body += data.toString());
        request.on("end", () => {
            let params = JSON.parse(body);
            send(params.from, params.to, params.message);
            response.end("<h1>Success</h1>");
            console.log('send mail');
        })        
    }
}
).listen(5000);
console.log("Server running at http://localhost:5000/");
