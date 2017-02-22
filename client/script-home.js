var editableEditUrlChange = function(propagate){
    var extractedText = document.getElementById('editable-edit-url').textContent;
    document.getElementById('edit-url').setAttribute('href', '/edit/'+extractedText) ;
    if(propagate){
        document.getElementById('editable-read-url').textContent = extractedText;
        document.getElementById('editable-snap-url').textContent = extractedText;
        document.getElementById('editable-read-url').oninput(false);
        document.getElementById('editable-snap-url').oninput(false);
    }
}

document.getElementById('editable-edit-url').addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("edit-url").click();
    }
});

document.getElementById('editable-edit-url').oninput = editableEditUrlChange ;


var editableReadUrlChange = function(propagate){
    var extractedText = document.getElementById('editable-read-url').textContent;
    document.getElementById('read-url').setAttribute('href', '/read/'+extractedText) ;
    if(propagate){
        document.getElementById('editable-edit-url').textContent = extractedText;
        document.getElementById('editable-snap-url').textContent = extractedText;
        document.getElementById('editable-edit-url').oninput(false);
        document.getElementById('editable-snap-url').oninput(false);
    }
}

document.getElementById('editable-read-url').addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("read-url").click();
    }
});

document.getElementById('editable-read-url').oninput = editableReadUrlChange ;

var editableSnapUrlChange = function(propagate){
    console.log(propagate);
    var extractedText = document.getElementById('editable-snap-url').textContent;
    document.getElementById('snap-url').setAttribute('href', '/snap/'+extractedText) ;
    if(propagate){
        document.getElementById('editable-edit-url').textContent = extractedText;
        document.getElementById('editable-read-url').textContent = extractedText;
        document.getElementById('editable-edit-url').oninput(false);
        document.getElementById('editable-read-url').oninput(false);
    }
}

document.getElementById('editable-snap-url').addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("snap-url").click();
    }
});

document.getElementById('editable-snap-url').oninput = editableSnapUrlChange ;