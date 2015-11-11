var http = require('http');
var url = require('url');
var express = require('express');
var app = express();

var listenPort = 12345;

// function handleRequest(req, res) {
//     if (req.method === 'GET') {
//         res.write('Get Received');
//         res.end();
//     } else {
//         res.write('Oops!  Something went wrong!');
//         res.end();
//     }
// }

// var server = http.createServer(handleRequest);

// server.listen(process.env.PORT || listenPort);

app.get('/', function(req, res) {
    res.send('get message received');
});

app.post('/', function(req, res) {
    res.send('post message received');
    res.send(req.body)
})

app.listen(process.env.PORT || listenPort);
console.log('Server running at localhost:' + listenPort);