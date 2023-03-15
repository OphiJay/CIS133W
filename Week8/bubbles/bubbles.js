window.addEventListener('load', function() {
    document.getElementById('background').addEventListener('click', function (evt) {
        console.log('clicked on background', evt)
    });
    document.getElementById('inputButton').addEventListener('click', function (evt) {
        console.log('clicked on inputButton', evt)
        evt.stopPropagation();
    });
    document.getElementById('dialog').addEventListener('click', function (evt) {

        evt.stopPropagation();
    });
});