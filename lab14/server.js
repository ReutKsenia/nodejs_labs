const http = require('http');
const mssql = require('mssql/msnodesqlv8');
const {parse} = require('querystring');

const get_handler = require('./handlers/get_handler');
const post_handler = require('./handlers/post_handler');
const put_handler = require('./handlers/put_handler');
const delete_handler = require('./handlers/delete_handler');
const err_handler = require('./handlers/err_handler');

let request_handler = (req, res, pool) => {
  switch(req.method) {
      case 'GET': get_handler(req, res, pool); break;
      case 'POST': {
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              post_handler(req, res, JSON.parse(body), pool);
          });
      } break;
      case 'PUT': {
          let body = '';
          req.on('data', chunk => {
              body += chunk.toString();
          });
          req.on('end', () => {
              put_handler(req, res, JSON.parse(body), pool);
          });
      } break;
      case 'DELETE': delete_handler(req, res, pool); break;
      default: err_handler(req, res, 501, 'This method is not supported'); break;
  }
};

let config = {driver: 'msnodesqlv8', connectionString:'Driver={SQL Server Native Client 11.0};Server={DESKTOP-L93MRGU\\SQLEXPRESS};Database={RKP};Trusted_Connection={yes};',
                pool: {max: 10, min: 0, softIdleTimeoutMillis: 5000, idleTimeoutMillis: 10000}};

let server = http.createServer();
server.listen(3000);
server.on('request', (req, res) => {
    const pool = new mssql.ConnectionPool(config, err => {
        if (err) {
            console.log('Database connection failed: ', err.code);
            err_handler(req, res, 500, err.message);
        }
        else {
            console.log('Database connection success');
            request_handler(req, res, pool);
        }
    });
});

console.log('Server running at http://localhost:3000/');