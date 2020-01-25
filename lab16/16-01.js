const http = require('http');
const fs = require('fs');
const {graphql, buildSchema} = require('graphql');
const {DB} = require('./db');
const {resolver} = require('./resolver');
const schema = buildSchema(fs.readFileSync('./schema.gql').toString());
const m0706 = require('./module');

const server = http.createServer();

let context = DB((err, connect) => {
    if (err) {
        console.log('Database connection failed');
    } else {
        console.log('Database connection successful');
        server.listen(5000, (v) => {
            console.log('Server running at http://localhost:5000/')})
            .on('error', (e) => {console.log('Error:', e.code);})
            .on('request', handler);
    }
});

let handler = (req, res) => {
    if (req.method = 'POST' && m0706.isJsonContentType(req.headers)) {
        let result = '';
        req.on('data', (data) => {result += data;});
        req.on('end', () => {
            try {
                let obj = JSON.parse(result);
                if (m0706.isJsonAccept(req.headers)) {
                    if (obj.mutation) {
                        graphql(schema, obj.mutation, resolver, context, obj.variables?obj.variables:{})
                            .then((result) => {
                                new IfError(result)
                                    .then((json) => {m0706.write400(res, '', json)})
                                    .else((json) => {m0706.write200(res, '', json)});
                            })
                    }
                    if (obj.query) {
                        graphql(schema, obj.query, resolver, context, obj.variables?obj.variables:{})
                            .then((result) => {
                                new IfError(result)
                                    .then((json) => {m0706.write400(res, json)})
                                    .else((json) => {m0706.write200(res,'', json)});
                            })
                    }
                } else m0706.write400(res, JSON.stringify({error: 'Bad Accept'}));
            } catch (e) {
                m0706.write400(res, JSON.stringify({error: 'Bad JSON'}));
            }
        })
    } else m0706.write400(res, 'no JSON-POST');
};

function IfError (result) {
    this.then = () => {return this};
    this.else = () => {return this};
    if (result.errors) {
        this.then = (cb) => {
            let json = JSON.stringify({error: result.errors[0].message});
            cb(json);
            return this;
        }
    } else if (result.data) {
        this.else = (cb) => {
            let json = JSON.stringify(result.data);
            cb(json);
            return this;
        }
    }
}