var http = require('http');
var url = require('url');
var listenPort = 12345;

function handleRequest(req, res) {
    if (req.method === 'GET') {
        res.write('Get Received');
        res.end();
    } else {
        res.write('Oops!  Something went wrong!');
        res.end();
    }
}

var server = http.createServer(handleRequest);

server.listen(listenPort);
console.log('Server running at localhost:' + listenPort);