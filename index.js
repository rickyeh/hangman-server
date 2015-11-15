var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var rand = require('generate-key');

const listenPort = 12345;
const num_lives = 5;


// Object to hold ongoing games
var gameDatabase = {};

// Dictionary - Read from file
var dictionary = [];

fs.readFile('dictionary.txt', 'utf8', function(err, data) {
    dictionary = data.split('\n');
});

// dictionary = ["what's up"];

// BodyParser
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send(req.query);
    res.send('get message received');
    console.log('get received');
});

// app.get('/:data:callback', function(req, res) {
//     res.send('get message received');
//     console.log('get received');
// });

// Post received to root
// New Game Generation
app.post('/', function(req, res) {
    var newGame = {};
    newGame.game_key = rand.generateKey();
    newGame.puzzle = dictionary[Math.floor(Math.random() * dictionary.length)]; // Random word here later
    newGame.num_tries_left = 5;
    newGame.state = 'alive';
    newGame.guessedLetters = []; // Include spaces so mask function will ignore

    gameDatabase[newGame.game_key] = newGame;

    console.log();
    console.log('New Game requested received with email: ' + req.body.email);
    console.log('Key generated : ' + newGame.game_key);
    console.log('Game Database is currently:');
    printDatabase();

    var response = {
        game_key: newGame.game_key,
        phrase: maskPhrase(newGame.puzzle, newGame.guessedLetters),
        state: 'alive',
        num_tries_left: num_lives
    };

    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(response));
});

// Post received at URL /game_key
// Resume an existing game
app.post('/:id', function(req, res) {
    console.log(req.params.id);
    console.log();
    console.log('Letter Guessed: ' + req.body.guess);

    // Looks up the game based on the key provided by the id parameter in URL
    var currentGame = gameDatabase[req.params.id];

    // Guesses the letter
    currentGame = guessLetter(req.body.guess, currentGame);

    // Build response obj
    var response = {
        game_key: currentGame.game_key,
        phrase: maskPhrase(currentGame.puzzle, currentGame.guessedLetters),
        state: currentGame.state,
        num_tries_left: currentGame.num_tries_left
    };

    // Check for loss or win conditions
    if (currentGame.num_tries_left < 0) {
        response.state = 'lost';
    } else if (currentGame.puzzle === response.phrase) { 
        response.state = 'won';
    }
    
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(response));
});

// Function that checks a letter against the puzzle.
function guessLetter(letter, gameObj) {
    if (gameObj.puzzle.indexOf(letter) > -1) { // Found match
        gameObj.guessedLetters.push(letter);
    } else {
        gameObj.num_tries_left--;
        gameObj.guessedLetters.push(letter);
    }

    return gameObj;
}

// Function that prints the database of current games.  Used for troubleshooting/debugging
function printDatabase() {
    for (var k in gameDatabase) {
        console.log(k + ' - ' + gameDatabase[k].puzzle);
    }
}

// Function takes a phrase, and returns the phrase masked except for guessed letters
// REGEX VERSION.
function maskPhrase(phrase, guessedLetters) {
    var specialCharacters = " &-?!.'";
    // [^guessedLetters ] - Regex that needs to be generated + space
    // [^abc &-?!.']
    var regex = new RegExp('[^' + guessedLetters.join('') + specialCharacters + ']', 'g');
    return phrase.replace(regex, '_');
}

// Function takes a phrase, and returns the phrase masked except for guessed letters
// MAP VERSION
// function maskPhrase(phrase, guessedLetters) {
//     // Split string into array of characters
//     phrase = phrase.split('');

//     var maskedArray = phrase.map(function(currLetter) {
//         if (currLetter === ' ') {
//             return ' ';
//         } else if (hasMatch(currLetter, guessedLetters)) { // If char matches a guessed letter
//             return currLetter;
//         } else { // Else return an underscore to mask
//             return '_';
//         }
//     });

//     return maskedArray.join('');
// }

// // Helper function used to detect whether a letter exists in an array of letters
// function hasMatch(letter, guessedLetters) {
//     for (var i = 0; i < guessedLetters.length; i++) {
//         if (guessedLetters[i] === letter) {
//             return true;
//         }
//     }
//     return false;
// }

// Start the server
app.listen(process.env.PORT || listenPort);
console.log('Server running at localhost:' + listenPort);