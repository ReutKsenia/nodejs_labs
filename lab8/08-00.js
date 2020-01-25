const fs = require('fs');
var url = require("url");
const http = require('http');
const qs = require('querystring');
const mp = require('multiparty');
let Stat = require('./m07-01')('./static');
const Json = require('./json_module');
const crJs = require('./createJson_module');
const XML = require('./xml_module');
const crXML = require('./XMLHandler_module');
const parseString = require('xml2js').parseString;
const PORT = 5000;

let HTTP404 = (req, res) => {
  console.log(`${req.method}: ${req.url}, HTTP status 404`);
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`"error" : "${req.method}: ${req.url}, HTTP status 404"`);
}

let HTTP405 = (req, res) => {
  console.log(`${req.method}: ${req.url}, HTTP status 405`);
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
}

let http_handler = (req, res) => {
  switch (req.method) {
    case 'GET': GET_handler(req, res); break;
    case 'POST': POST_handler(req, res); break;
    default: HTTP405(req, res); break;
  }
};

let GET_handler = (req, res) => {
  let path = url.parse(req.url).pathname;
  switch (true) {
    case path === '/connection': {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      let url_parts = url.parse(req.url, true);
      let query = url_parts.query;
      let set = parseInt(query.set, 10);
      if (!isNaN(set)) {
        server.keepAliveTimeout = set;
        console.log(server.keepAliveTimeout);
      }
      res.end(`<h1>KeepAliveTimeout: ${server.keepAliveTimeout}</h1>`);
      break;
    }
    case path === '/headers': {
      res.setHeader("X-Type", "Created");
      console.log('Get headers');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(`<h3>request: ${JSON.stringify(req.headers)}</h3>`);
      res.write(`<h3>response: ${JSON.stringify(res.getHeaders())}</h3>`);
      res.end();
      break;
      }
    case path === '/parameter': {
      let url_parts = url.parse(req.url, true);
      let query = url_parts.query;
      let x = parseInt(query.x, 10);
      let y = parseInt(query.y, 10);
      if (isNaN(x) || isNaN(y)) {
        res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`<h1>Ошибка! Числа не введены</h1>`);
      } else {
        res.write(`<h1>x+y: ${Math.round(+x) + Math.round(+y)}</h1><br>
        <h1>x-y: ${Math.round(+x) - Math.round(+y)}</h1><br>
        <h1>x*y: ${Math.round(+x) * Math.round(+y)}</h1><br>
        <h1>x/y: ${Math.round(+x) / Math.round(+y)}</h1><br>`);
      }
      break;
    }
    case /\/parameter\/\w+\/\w+/.test(path):
      let arr = path.split('/');
      let x = arr[2];
      let y = arr[3];
      if (isNaN(x) || isNaN(y)) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(req.url);
      } else {
        res.write(`<h1>x+y: ${Math.round(+x) + Math.round(+y)}</h1><br>
        <h1>x-y: ${Math.round(+x) - Math.round(+y)}</h1><br>
        <h1>x*y: ${Math.round(+x) * Math.round(+y)}</h1><br>
        <h1>x/y: ${Math.round(+x) / Math.round(+y)}</h1><br>`);
      }
      break;
    case path === '/close':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>Server will be closed after 10 sec.</h1>`);
      console.log("Server will be closed after 10 sec");
      setTimeout(() => server.close(() => console.log("Server closed")), 1000);
      break;
    case path === '/socket':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(`<h3>LocalAddress =  ${req.connection.localAddress}</h3>`);
      res.write(`<h3>LocalPort = ${req.connection.localPort}</h3>`);
      res.write(`<h3>RemoteAddress = ${req.connection.remoteAddress}</h3>`);
      res.write(`<h3>RemoteFamily = ${req.connection.remoteFamily}</h3>`);
      res.write(`<h3>RemotePort = ${req.connection.remotePort}</h3>`);
      res.end(`<h3>BytesWritten = ${req.connection.bytesWritten}</h3>`);
      break;
    case path === '/req-data':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      let buf = '';
      req.on('data', (data) => {
        console.log('req-data = ', data.length);
        buf += data;
      });
      req.on('end', () => {
        console.log('req-data(end) = ', buf.length);
      });
      res.write('<h2>Http-server</h2>');
      res.end();
      break;
    case path === '/resp-status': {
      let url_parts = url.parse(req.url, true);
      let query = url_parts.query;
      let code = parseInt(query.code, 10);
      let mess = query.mess;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h3>Status code:' + code + '\n' + 'Status message: ' + mess + '</h3>');
      break;
    }
    case path === '/formparameter':
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(__dirname + "/static/Formparameter.html").pipe(res);
      break;
    case path === '/upload':
      fs.readFile(__dirname + "/static/Update.html", (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
      break;
    case path === '/files':
      console.log('Get files count');
      fs.readdir(__dirname + '/static', (err, files) => {
        if (err) res.statusCode = 500;
        res.setHeader('X-static-files-count', files.length);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h3>Files count: ${files.length}</h3>`);
      });
      break;
    case /\/files\/.+/.test(path): {
      let arr = path.split('/');
      let filename = arr[2];
      console.log(filename);
      console.log(__dirname + `\\static\\${filename}`);
      fs.readFile(__dirname + `\\static\\${filename}`, err => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`ERROR 404: ${filename} is not found.`);
        } else {
          console.log('sendFile');
          res.u
          Stat.sendFile(req, res);
        }
      });
      break;
    }
    default: HTTP404(req, res); break;
  }
};

let POST_handler = (req, res) => {
  switch (req.url) {
    case '/formparameter': {
      let result = '';
      req.on('data', (data) => { result += data; });
      req.on('end', () => {
        result += '<br/>';
        let o = qs.parse(result);
        for (let key in o) {
          result += `${key} = ${o[key]}<br/>`;
        }
        console.log(result)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Parameters: </h1>');
        res.end(result);
      });
      break;
    }
    case '/xml': {
      console.log('xml');
      let result = '';
      req.on('data', (data) => { result += data; });
      req.on('end', () => {
        parseString(result, (err, data) => {
          if (err) {
            console.log(err, 'xml parse error');
            XML.write400(res, 'xml parse error');
          } else {
            XML.write200(res, 'ok xml', crXML.calc(data));
          }
        });
      });
      break;
    }
    case '/json': {
      let result = '';
      req.on('data', (data) => { result += data; });
      req.on('end', () => {
        try {
          let obj = JSON.parse(result);
          console.log(obj);
          if (Json.isJsonContentType(req.headers)) {
            Json.write200(res, 'json ok', crJs.createResp(obj));
          } else {
            Json.write400(res, 'no accept');
          }
        } catch (e) {
          Json.write400(res, 'catch: bad json');
        }
      });
      break;
    }
    case '/upload': {
      let form = new mp.Form({ uploadDir: './files' });
      form.on('file', (name, file) => {
        fs.copyFile(name, form.uploadDir, () => {
          console.log('File is copied.');
        });
      });
      form.parse(req);
      let result = '';
      req.on('data', (data) => {
        result += data;
      });
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>File upload</h1>');
        res.end(result);
      });
      break;
    }
    default: HTTP404(req, res); break;
  }
};

// function parameterHandler(x, y, res)
// {
//     if (Number.isInteger(x) && Number.isInteger(y))
//     {
//         res.json(
//           {
//             add: x + y,
//             sub: x - y,
//             mult: x * y,
//             div: x / y
//         });
//     }
//     else
//         res.json({message: 'Wrong data type'});
// }

const server = http.createServer().listen(PORT, (v) => {
  console.log(`Listening on http://localhost:${PORT}`);
})
  .on('error', (e) => { console.log(`${URL} | error: ${e.code}`) })
  .on('request', http_handler);
