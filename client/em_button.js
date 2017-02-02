var em_button = document.createElement('span');
em_button.innerHTML = '<button id="button-emphasize">Emphasize</button><script src="/static/em_button.js"/>';

document.getElementById('editable-editor').insertBefore(em_button, document.getElementById('editable-editor').childNodes[0]);

var emphasize = function(mouseEvent){
    var selectedContent = window.getSelection();
    var selectedRange = selectedContent.getRangeAt(0);
    console.log(selectedRange.cloneContents());
    var oldText = selectedRange.cloneContents().textContent;
    selectedRange.deleteContents('');
    selectedRange.insertNode(document.createTextNode('_'+oldText+'_'));

    document.getElementById('editable-document').dispatchEvent(new Event('input'));
}

document.getElementById('button-emphasize').onclick = emphasize ;