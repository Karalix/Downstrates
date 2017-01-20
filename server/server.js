var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');

var backend = new ShareDB();
createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
    var connection = backend.connect();
    var doc = connection.get('examples', 'textarea');
    var chat = connection.get('chat', 'chat-msg');
    doc.fetch(function(err) {
        if (err) throw err;
              if (doc.type === null) {
                  doc.create('Type here', callback);
                  return;
              }
              callback();
    });
    
    doc.on('op',function(){
        console.log(doc.data);
    })
    
    
    chat.on('op', function(){
        console.log(chat.data);
    })
}

function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    var app = express();
    app.use(express.static('../client'));
    var server = http.createServer(app);
    
    // Connect any incoming WebSocket connection to ShareDB
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws, req) {
        var stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });
    
    server.listen(8080);
    console.log('Listening on http://localhost:8080');
}
