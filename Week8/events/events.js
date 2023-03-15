window.addEventListener("DOMContentLoaded", function (evt) {
    console.log("DOMContentLoaded", evt);
});

window.addEventListener("load", function (evt) {
    console.log("load", evt);
    addMouseEvents('click');
    addKeyEvents();
});

document.addEventListener("readystatechange", function (evt) {
    console.log("readystatechange", evt, document.readyState);
});

window.addEventListener("beforeunload", function (evt) {
    console.log("beforeunload", evt);
});

window.addEventListener("unload", function (evt) {
    console.log("unload", evt);
    console.log("ready to leave");
});

function addMouseEvents(id) {
    var box = document.getElementById(id);

    function addEvent(evtType) {
        box.addEventListener(evtType, function(evt) {
            console.log(evtType, evt);
        });
    }

    addEvent('mousedown');
    addEvent('mouseup');
    addEvent('click');
    addEvent('dblclick');
    //addEvent('mousemove');
    addEvent('mouseenter');
    addEvent('mouseleave');
    addEvent('mouseover');
    addEvent('mouseout');

    box.addEventListener('mouseover', function() {
        box.style.color = 'yellow';
        box.style.backgroundColor = 'black'
    });
    box.addEventListener('mouseout', function() {
        box.style.color = 'black';
        box.style.backgroundColor = 'white'
    });

}

function addKeyEvents() {
    var xPos = 250;
    var yPos = 250;
    var box = document.getElementById('click');

    function addEvent(evtType) {
        window.addEventListener(evtType, function(evt) {
            console.log(evtType, evt);
        });
    }
    addEvent('keyup');
    addEvent('keydown');
    addEvent('keypress');

    window.addEventListener('keydown', function(evt) {

        switch (evt.key) {
            case "ArrowLeft":
                xPos -= 10;
                break;
            case  "ArrowRight":
                xPos += 10;
                break;
            case "ArrowUp":
                yPos -= 10;
                break;
            case "ArrowDown":
                yPos += 10;
                break; 
        }
        box.style.left = xPos + 'px';
        box.style.top = yPos + 'px';

        evt.preventDefault();
    });

    box.style.left = xPos + 'px';
    box.style.top = yPos + 'px';
}

