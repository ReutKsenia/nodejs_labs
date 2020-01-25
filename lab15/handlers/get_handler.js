const url = require('url');
const fs = require('fs');
let err_handler = require('./err_handler');

module.exports = (req, res, db) => {
    switch((url.parse(req.url)).pathname) {
        case '/api/faculties': {
            db.collection('faculty').find({}).toArray((err, docs) => {
                if (err) {
                    console.log(err);
                    err_handler(req, res, 500, err.message);
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(docs));
                }
            });
        } break;
        case '/api/pulpits': {
            db.collection('pulpit').find({}).toArray((err, docs) => {
                if (err) {
                    console.log(err);
                    err_handler(req, res, 500, err.message);
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(docs));
                }
            });
        } break;
        default: err_handler(req, res, 400, 'Bad request'); break;
    }
};