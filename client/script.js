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

doc.on('op',documentChange);

document.getElementById('button-emphasize').onclick = emphasize ;

document.getElementById('editable-document').oninput = documentChange ;
