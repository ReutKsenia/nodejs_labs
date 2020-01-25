const url = require('url');
let err_handler = require('./err_handler');

module.exports = (req, res, db) => {
    const path = (url.parse(req.url)).pathname;
    switch(true) {
        case /\/api\/faculties\/\w+/.test(path): {
            db.collection('faculty').deleteMany(
                { faculty: path.split('/')[3] },
                (err, result) => {
                    if (err) {
                        console.log(err);
                        err_handler(req, res, 500, err.message);
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(result));
                    }
                });
        } break;
        case /\/api\/pulpits\/\w+/.test(path): {
            db.collection('pulpit').deleteMany(
                { pulpit: path.split('/')[3] },
                (err, result) => {
                    if (err) {
                        console.log(err);
                        err_handler(req, res, 500, err.message);
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                        res.end(JSON.stringify(result));
                    }
                });
        } break;
        default: err_handler(req, res, 400, 'Bad request'); break;
    }
};