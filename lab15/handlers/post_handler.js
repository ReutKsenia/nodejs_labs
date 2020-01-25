const url = require('url');
let err_handler = require('./err_handler');

module.exports = (req, res, data, db) => {
    switch((url.parse(req.url)).pathname) {
        case '/api/faculties': {
            db.collection('faculty').insertOne({
                faculty: data.faculty,
                faculty_name: data.faculty_name
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    err_handler(req, res, 500, err.message);
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(result.ops[0]));
                }
            });
        } break;
        case '/api/pulpits': {
            db.collection('pulpit').insertOne({
                pulpit: data.pulpit,
                pulpit_name: data.pulpit_name,
                faculty: data.faculty
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    err_handler(req, res, 500, err.message);
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(result.ops[0]));
                }
            });
        } break;
        default: err_handler(req, res, 400, 'Bad request'); break;
    }
};