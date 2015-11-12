var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var listenPort = 12345;

// Dummy Puzzle for now
var puzzle = {
        game_key: '1',
        phrase: 'all your base are belong to us',
        state: 'alive',
        num_tries_left: 5
    }
;

// BodyParser

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(function(req, res) {
    var obj = req.body;
    var email = obj.email;
    var response = {};

    response = puzzle;

    console.log('Body Parser Used');
    console.log(JSON.stringify(req.body));

    res.setHeader('Content-Type', 'text/plain');

    res.end(JSON.stringify(response));
    // res.end(JSON.stringify(req.body, null, 2));
})


app.get('/', function(req, res) {
    res.send('get message received');
    console.log('get received');
});


app.post('/', function(req, res) {
    res.send('POST received');
    res.send(req.body)
    console.log(req.body);
    console.log('Post received');
})

app.listen(process.env.PORT || listenPort);
console.log('Server running at localhost:' + listenPort);