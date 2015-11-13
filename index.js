var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var rand = require('generate-key');

var listenPort = 12345;

// Dictionary
var dictionary = ['macbook', 'surface'];

// Object to hold ongoing games
var gameDatabase = {};

// Dummy Puzzle for now
var puzzle = {
        game_key: '1',
        phrase: 'all your base are belong to us',
        state: 'alive',
        num_tries_left: 5
    }
;

// BodyParser

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('get message received');
    console.log('get received');
});

// Post received to root - New Game Generation
app.post('/', function(req, res) {
    var newGame = {};
    newGame.game_key = rand.generateKey();
    newGame.puzzle = dictionary[0]; // Random word here later
    newGame.num_tries_left = 5;
    newGame.state = 'alive';

    gameDatabase[newGame.game_key] = newGame;

    console.log();
    console.log('New Game requested received with email: ' + req.body.email);
    console.log('Key generated : ' + newGame.game_key);

    var response = {
        game_key: '',
        phrase: '',
        state: '',
        num_tries_left: 0
    };

    console.log('Game Database is currently:');
    printDatabase();


    // res.setHeader('Content-Type', 'text/plain');
    // res.end(JSON.stringify(response));


    // res.end(JSON.stringify(req.body, null, 2));
})

function printDatabase() {
    for (var k in gameDatabase) {
        console.log(k + ' - ' + gameDatabase[k].puzzle);
    }
}

app.listen(process.env.PORT || listenPort);
console.log('Server running at localhost:' + listenPort);