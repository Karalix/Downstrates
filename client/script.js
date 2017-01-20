var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
var doc = connection.get('examples', 'textarea');
doc.subscribe(function(err) {
    if (err) throw err;
    var element = document.getElementById('editable-document');
    var binding = new StringBinding(element, doc);
    binding.setup();
    documentChange();
    doc.on('op',documentChange);
});

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


var emphasize = function(mouseEvent){
    var selectedContent = window.getSelection();
    var selectedRange = selectedContent.getRangeAt(0);
    console.log(selectedRange.cloneContents());
    var oldText = selectedRange.cloneContents().textContent;
    selectedRange.deleteContents('');
    selectedRange.insertNode(document.createTextNode('_'+oldText+'_'));

    document.getElementById('editable-document').dispatchEvent(new Event('input'));
}

var documentChange = function(){
    var extractedText = document.getElementById('editable-document').innerText;
    document.getElementById('viewable-document').innerHTML = markdown.toHTML(extractedText);
}

var chatChange = function(){
    var chatMsg = document.getElementById('chat').innerText;
}

document.getElementById('button-emphasize').onclick = emphasize ;

document.getElementById('editable-document').oninput = documentChange ;
document.getElementById('chat').oninput = chatChange;
