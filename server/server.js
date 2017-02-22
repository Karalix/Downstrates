var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
var markdown = require('markdown').markdown;

// Maybe the mongo creation should also be in the startServer function?
const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
const backend = new ShareDB({db});
var connection = backend.connect();


// Create a web server to serve files and listen to WebSocket connections
var app = express();

app.use('/static',express.static('../client'));

app.get(/edit\/..+/,function(req, res){
    res.sendFile('editor.html',{root:'../client'});
});
app.get(/read\/..+/,function(req, res){
    res.sendFile('reader.html',{root:'../client'});
});
app.get('/snap/:docId', function(req, res){
    var doc = connection.get('examples',req.params.docId);
    doc.fetch(function(err) {
        let htmlRes  = '<!DOCTYPE html>'+
                        '<html lang="en">'+
                            '<head>'+
                                '<meta charset="utf-8">'+
                                '<title>DownStrates</title>'+
                                '<link rel="stylesheet" href="/static/style-reader.css">'+
                             '</head>'+
                            '<body>'+
                            '<div id="viewable-document" >';
        if(!err && doc.type != null) {
            htmlRes += markdown.toHTML(doc.data)
        }
        htmlRes += '</div></body></html>';
        res.send(htmlRes);
    });
});
app.get('/', function(req, res){
    res.redirect('/static');
});

var server = http.createServer(app);

// Connect any incoming WebSocket connection to ShareDB
var wss = new WebSocket.Server({server: server});
wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
});

server.listen(8080);
console.log('Listening on http://localhost:8080');

/*
chat.on('op', function(){
    console.log(chat.data);
})
*/
