var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');

// Maybe the mongo creation should also be in the startServer function?
const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
const backend = new ShareDB({db});


// Create a web server to serve files and listen to WebSocket connections
var app = express();

app.use('/static',express.static('../client'));

app.get(/edit\/..+/,function(req, res){
    res.sendFile('editor.html',{root:'../client'});
});
app.get(/read\/..+/,function(req, res){
    res.sendFile('reader.html',{root:'../client'});
});
app.get('/', function(req, res){
    res.redirect('/static');
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('new user connected');
});

// Connect any incoming WebSocket connection to ShareDB
var wss = new WebSocket.Server({server: server});
wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
});

server.listen(8080);
console.log('Listening on http://localhost:8080');
