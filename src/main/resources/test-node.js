const fs = require('fs-extra');
const path = require('path');
const http = require('http');

var server = http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(someJavaMethod());
    });

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');