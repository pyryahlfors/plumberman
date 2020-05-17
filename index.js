var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/sc5', function(req, res) {
    res.sendFile(__dirname + '/sc5.html');
});

app.get('/tetris', function(req, res) {
    res.sendFile(__dirname + '/tetris.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
