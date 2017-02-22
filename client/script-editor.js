var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');
var markdown = require('markdown').markdown;

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

var pathname = window.location.pathname;
pathname = pathname.split("/")[2];
console.log(pathname);
pathname = pathname.replace(/\//g, '');

var myWidgets = [];

var myFormerWidgets = JSON.parse(localStorage.getItem('myWidgets'));

myFormerWidgets === null ? console.log('No prior widget found') : myWidgets = myFormerWidgets;


// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
var doc = connection.get('examples', pathname);
doc.subscribe(function(err) {
    if (err) throw err;
    if (doc.type === null) {
        doc.create('This document is all new, what about modifying it at [this adress](/edit/'+pathname+') ?');
    }
    var element = document.getElementById('editable-document');
    var binding = new StringBinding(element, doc);
    binding.setup();
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
    var extractedText = document.getElementById('editable-document').innerText;
    document.getElementById('viewable-document').innerHTML = markdown.toHTML(extractedText);
}

/*
var chatChange = function(){
    var chatMsg = document.getElementById('chat').innerText;
}
*/

document.getElementById('editable-document').oninput = documentChange ;

document.getElementById('ui-goto-read-button').onclick = function(){ window.location.href='/read/'+pathname;}
// document.getElementById('chat').oninput = chatChange;
/*
window.onload = function(){

    var em_script = document.createElement('script');
    em_script.src = '/static/em_button.js';

    document.getElementById('editable-editor').insertBefore(em_script, document.getElementById('editable-editor').childNodes[0]);
}
*/
// Ui add modal stuff

var modal = document.getElementById('ui-add-modal');
var btn = document.getElementById("ui-add-button");
var closeButton = document.getElementById("close-button");
var widgetUrlButton = document.getElementById('widget-url-button');

btn.onclick = function() {
    modal.style.display = "block";
}

var closeModale = function() {
    modal.style.display = "none";
}

closeButton.onclick = closeModale;

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

widgetUrlButton.onclick = function() {
    var widgetUrl = document.getElementById('widget-url-input').value;
    addWidget(widgetUrl);

    myWidgets.push(widgetUrl);
    localStorage.setItem('myWidgets',JSON.stringify(myWidgets));

    document.getElementById('widget-url-input').value = "";
    closeModale();
}

var addWidget = function(widgetUrl) {
    
    var em_script = document.createElement('script');
    em_script.src = widgetUrl;
    document.getElementById('editable-editor').insertBefore(em_script, document.getElementById('editable-editor').childNodes[0]);
}


myWidgets.forEach(function(widget){
    addWidget(widget);
})