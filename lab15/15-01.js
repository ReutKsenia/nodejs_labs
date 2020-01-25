const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const get_handler = require('./handlers/get_handler');
const post_handler = require('./handlers/post_handler');
const put_handler = require('./handlers/put_handler');
const delete_handler = require('./handlers/delete_handler');
const err_handler = require('./handlers/err_handler');

let request_handler = (req, res) => {
    switch(req.method) {
        case 'GET': get_handler(req, res, db); break;
        case 'POST': {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                post_handler(req, res, JSON.parse(body), db);
            });
        } break;
        case 'PUT': {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                put_handler(req, res, JSON.parse(body), db);
            });
        } break;
        case 'DELETE': delete_handler(req, res, db); break;
        default: err_handler(req, res, 501, 'This method is not supported'); break;
    }
};



const uri = 'mongodb+srv://reut:1q2w3e4r@cluster0-s5nmz.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

let db;

const server = http.createServer();
server.listen(3000);
server.on('request', (req, res) => {
    client.connect(err => {
        if (err) {
            console.log('MongoDB: error connection');
            err_handler(req, res, 500, err.message);
        }
        else {
            console.log('MongoDB: connect successful');
            db = client.db('BSTU');
            request_handler(req, res);
        }
    });
});

console.log('Server running at http://localhost:3000/');
