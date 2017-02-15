var editableEditUrlChange = function(){
    var extractedText = document.getElementById('editable-edit-url').textContent;
    document.getElementById('edit-url').setAttribute('href', '/edit/'+extractedText) ;
    document.getElementById('editable-read-url').textContent = extractedText;
}

document.getElementById('editable-edit-url').addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("edit-url").click();
    }
});

document.getElementById('editable-edit-url').oninput = editableEditUrlChange ;


var editableReadUrlChange = function(){
    var extractedText = document.getElementById('editable-read-url').textContent;
    document.getElementById('read-url').setAttribute('href', '/read/'+extractedText) ;
    document.getElementById('editable-edit-url').textContent = extractedText;
}

document.getElementById('editable-read-url').addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("read-url").click();
    }
});

document.getElementById('editable-read-url').oninput = editableReadUrlChange ;
