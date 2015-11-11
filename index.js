var http = require('http');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

// app.use(bodyParser.urlencoded({ extended: false}));

// app.use(bodyParser.json());

// app.use(function(req, res) {
//     console.log('app used');
//     console.log(JSON.stringify(req.body));
//     res.setHeader('Content-Type', 'text/plain');
//     res.write('you posted: \n');
//     res.end(JSON.stringify(req.body, null, 2));
// })


app.get('/', function(req, res) {
    res.send('get message received');
    console.log('get received');
});

app.get('/game', function(req, res) {
    res.send('get message received');
    console.log('get received');
});

app.post('/', function(req, res) {
    res.send('post message received');
    res.send(req.body)
    console.log('Post received');
})

app.listen(process.env.PORT || listenPort);
console.log('Server running at localhost:' + listenPort);