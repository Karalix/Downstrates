var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

var pathname = window.location.pathname;
pathname = pathname.split("/")[2];
pathname = pathname.replace(/\//g, '');

// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
var doc = connection.get('examples', pathname);
doc.subscribe(function(err) {
    if (err) throw err;
    if (doc.type === null) {
        doc.create('Type here');
    }
    documentChange();
    doc.on('op',documentChange);
});

/*
// Create local Chat instance
var chat = connection.get('chat', 'chat-msg');
doc.subscribe(function(err){
    if (err) throw err;
              var chatlist = document.getElementById('chat');
    var binding = new StringBinding(chatlist, chat);
    binding.setup();
    chatChange();
    chat.on('op', chatChange);
});
*/


var documentChange = function(){
    document.getElementById('viewable-document').innerHTML = markdown.toHTML(doc.data);
}

/*
var chatChange = function(){
    var chatMsg = document.getElementById('chat').innerText;
}
*/

// document.getElementById('chat').oninput = chatChange;
