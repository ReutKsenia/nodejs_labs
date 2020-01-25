const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const file_path = './StudentList.json';

let delete_handler = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch (true) {
        case /\/backup\/\d+/.test(path): {
            let flag = false;
            fs.readdir('./backup', (err, files) => {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].match(/\d{8}/)[0] > Number(path.match(/\d+/))) {
                        flag = true;
                        fs.unlink(`./backup/${files[i]}`, (e) => {
                            if (e) {
                                console.log('Error');
                                response.end('Error');
                            } else {
                                console.log('Ok');
                                response.end('Ok');
                            }
                        });
                    }
                }
                if (!flag) {
                    response.setHeader('Content-Type', 'text/plain');
                    response.end('No files');
                }
            });
            break;
        }
        case /\/\d+/.test(path): {
            fs.readFile(file_path, (err, data) => {
                let json = JSON.parse(data.toString());
                for (let i = 0; i < json.length; i++) {
                    if (json[i].id === Number(path.match(/\d+/)[0])) {
                        response.setHeader('Content-Type', 'application/json');
                        response.write(JSON.stringify(json[i]));
                        delete json[i];
                    }
                }
                fs.writeFile(file_path, JSON.stringify(json), (e) => {
                    if (e) {
                        console.log('Error');
                        response.end('Error');
                    } else {
                        console.log('Ok');
                        response.end('Ok');
                    }
                });
                response.end();
            });
        }
    }
};

let get_handler = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch(true) {
        case path === '/': {
            fs.readFile(file_path, (err, data) => {
                response.setHeader('Content-Type', 'application/json');
                response.end(data);
            });
            break;
        }
        case /\/\d+/.test(path): {
            fs.readFile(file_path, (err, data) => {
                let json = JSON.parse(data.toString());
                for (let i = 0; i < json.length; i++) {
                    if(json[i].id === Number(path.match(/\d+/)[0])) {
                        response.setHeader('Content-Type', 'application/json');
                        response.write(JSON.stringify(json[i]));
                    }
                }
                if(!response.hasHeader('Content-Type')) {
                    response.setHeader('Content-Type', 'text/plain');
                    response.write('No data');
                }
                response.end();
            });
            break;
        }
        case path === '/backup': {
            fs.readdir('./backup', (err, files) => {
                response.setHeader('Content-Type', 'application/json');
                let json = [];
                for (let i = 0; i < files.length; i++) {
                    json.push({
                        id: i,
                        name: files[i]
                    });
                }
                response.end(JSON.stringify(json));
                console.log(files.length);
            });
        }
    }
};

let post_handler = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch(path) {
        case '/': {
            let body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                fs.readFile(file_path, (err, data) => {
                    let flag = true;
                    let json = JSON.parse(data.toString());
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].id === JSON.parse(body).id) {
                            flag = false;
                        }
                    }
                    if(flag) {
                        json.push(JSON.parse(body));
                        fs.writeFile(file_path, JSON.stringify(json), (e) => {
                            if (e) {
                                console.log('Error');
                                response.end('Error');
                            } else {
                                console.log('Student is added');
                                response.end(JSON.stringify(JSON.parse(body)));
                            }
                        });
                    } else {
                        response.setHeader('Content-Type', 'text/plain');
                        response.end(`Student with id = ${JSON.parse(body).id} exists`);
                    }
                });
            });
            break;
        }
        case '/backup': {
            let date = new Date();
            console.log(date);
            console.log(date.getDate());
            fs.copyFile(file_path, `./backup/${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}_StudentList.json`, (err) => {
                if (err) {
                    console.log('Error');
                    response.end('Error');
                } else {
                    console.log('File is copied');
                    response.end('Ok');
                }
            });
            break;
        }
    }
};


let put_handler = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch(path) {
        case '/': {
            let body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                fs.readFile(file_path, (err, data) => {
                    let flag = false;
                    let json = JSON.parse(data.toString());
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].id === JSON.parse(body).id) {
                            json[i] = JSON.parse(body);
                            fs.writeFile(file_path, JSON.stringify(json), (e) => {
                                if (e) {
                                    console.log('Error');
                                    response.end('Error');
                                } else {
                                    console.log('Student is altered');
                                    response.end(JSON.stringify(JSON.parse(body)));
                                }
                            });
                            flag = true;
                        }
                    }
                    if(!flag) {
                        response.setHeader('Content-Type', 'text/plain');
                        response.end(`Student with id = ${JSON.parse(body).id} does not exist`);
                    }
                });
            });
            break;
        }
    }
};

let server = http.createServer((request, response) => {
    switch(request.method){
        case 'GET': get_handler(request, response); break;
        case 'POST': post_handler(request, response); break;
        case 'PUT': put_handler(request, response); break;
        case 'DELETE': delete_handler(request, response); break;
    }
}).listen(4000);

console.log(`Listening on http://localhost:4000`);
