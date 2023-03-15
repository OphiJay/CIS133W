

window.addEventListener('DOMContentLoaded', (function () {
    
    var contents;

    var protocol;
    var hostname;
    var directory;
    var file;

    var TOC_TAG = "fetch_page_TOC";

    function parseBase() {
        var pos, slashPos;
        var remainder;

        pos = BASE.indexOf('://');
        protocol = BASE.substr(0, pos);
        remainder = BASE.substr(pos + 3);
        slashPos = remainder.indexOf('/');

        if (slashPos === -1) {
            hostname = remainder;
            hostname = "";
            directory = "";
            file = "";
        } else {
            hostname = remainder.substr(0, slashPos);
            remainder = remainder.substr(slashPos + 1);
            slashPos = remainder.lastIndexOf('/');
            if (slashPos === -1) {
                directory = "";
                file = remainder;
            } else {
                directory = remainder.substr(0, slashPos);
                file = remainder.substr(slashPos +1);
            }
        }

        console.log("protocol: ",  protocol);
        console.log("hostname: ",  hostname);
        console.log("directory: ",  directory);
        console.log("file: ",  file); 
    }

    function relativeToAbsolute(url) {
        if (url.indexOf('://') > -1) { // http:somedomain.com/path/file.html
            return url
        } else if (url[0] === '/') {        // /path/file.html
            return protocol + '://' + hostname + url;
        } else {        // path/file.html
            if (directory === "") {
                return protocol + '://' + hostname + '/' + url;
            } else {
                return protocol + '://' + hostname + '/' + directory + '/' + url;
            }
        }
    }

    function parsePage() {
        var parser = new DOMParser();
        contents = parser.parseFromString(atob(PAGE), "text/html");
        console.log(contents);
    }

    function moveChildren (source, destination) {
        while (source.childNodes.length > 0) {
            var child = source.childNodes[0];
            source.removeChild(child);

            if (child.tagName === 'SCRIPT') {
                var node = document.createElement('script')
                if (child.getAttribute('src')) { // <script src="script.js"></script>
                    node.setAttribute('src', child.getAttribute('src'));
                } else { // <script> js text here </script>
                    node.setAttribute('src', 'data:text/javascript;base64,' + btoa(child.innerText));
                }
                destination.appendChild(node);
            } else {
                destination.appendChild(child);
            }
        }
    }

    function fixTags(tagName, attribute) {
        var tags = contents.getElementsByTagName(tagName);

        for (var i = 0; i < tags.length; i ++) {
            var url = tags[i].getAttribute(attribute);
            if (url) {
                tags[i].setAttribute(attribute, relativeToAbsolute(url));
            }
        }
    }

    function fixRedirectedTags(tagName, attribute) {
        var tags = contents.getElementsByTagName(tagName);

        for (var i = 0; i < tags.length; i ++) {
            var url = tags[i].getAttribute(attribute);
            if (url) {
                tags[i].setAttribute(attribute, 
                    window.location.origin + 
                    window.location.pathname +
                    '?url=' +
                    encodeURIComponent(relativeToAbsolute(url)));
            }
        }
    }

    function fixURLs() {
        fixTags('img', 'src');
        fixTags('script', 'src');
        fixTags('link', 'href');
        fixRedirectedTags('a', 'href');
    }

    function buildTOC() {
        var levels = [0];
        var headers = [];
        var headerCount = 0;

        function scrapeText(node) {
            if (node.nodeType === document.TEXT_NODE) {
                return node.nodeValue;
            } else {
                var result = "";
                for (var i = 0; i < node.childNodes.length; i++) {
                    result += ' ' + scrapeText(node.childNodes[i]);
                }
                return result;
            }
        }

        function addListItem(node) {
            var child = document.createElement('li');
            var anchor = document.createElement('a');

            anchor.href = '#' + TOC_TAG + '_' + headerCount;
            child.appendChild(anchor);
            anchor.innerText = scrapeText(node);

            var span = document.createElement('span');
            span.id = TOC_TAG + '_' + headerCount;
            node.insertBefore(span, node.childNodes[0]);

            anchor = document.createElement('a')
            anchor.href = '#' + TOC_TAG;
            node.parentNode.insertBefore(anchor, node);
            anchor.innerText = '[top]';
            anchor.style.fontSize = '0.5em';

            headers[headers.length -1].appendChild(child);
            headerCount++;
        }

        function addLevel(node, level) {
            var child = document.createElement('ul');

            if (headers.length >0) {
                headers[headers.length -1].appendChild(child);
            }
            headers.push(child);
            addListItem(node);
            levels.push(level);
        }

        function removeLevel() {
            headers.pop();
            levels.pop();
        }

        function checkNodes(node) {
            if (node.nodeType !== document.ELEMENT_NODE) {
                return;
            }
            if (node.tagName[0] === 'H' && node.tagName[1] >= '1' && node.tagName[1] <= '6') {
                var level = Number(node.tagName[1]);
                var currentLevel = levels[levels.length -1];

                if (level > currentLevel) {
                    addLevel(node, level);
                } else if (level == currentLevel) {
                    addListItem(node);
                } else if ( level < currentLevel) {
                    while ( level < currentLevel) {
                        removeLevel();
                        currentLevel = levels[levels.length -1];
                    }
                    checkNodes(node);
                }

                // console.log(node.tagName, node.innerText);
            }

            var children = [].slice.call (node.childNodes)
            for (var i = 0; i < children.length; i ++ ) {
                checkNodes(children[[i]]);
            }
        }

        checkNodes(contents.body)
        var top = document.createElement('span');
        top.id = TOC_TAG;
        document.getElementById('toc').appendChild(top);
        if (headers[0]) {
            document.getElementById('toc').appendChild(headers[0]);
        }
    }

    function moveContent () {
        moveChildren(contents.head, document.head);
        moveChildren(contents.body, document.getElementById('contents'));

        var anchor = document.createElement('a');
        anchor.href = '#' + TOC_TAG;
        anchor.innerText = "[top]";
        anchor.style.fontSize = '0.5em';
        document.getElementById('contents').appendChild(anchor);
    }

    function submit () {
        if (encodeURIComponent(document.getElementById('urlBox').value)) {
            console.log("submitted: ", encodeURIComponent(document.getElementById('urlBox').value))
            window.location.href = window.location.origin + window.location.pathname + '?url=' +
            encodeURIComponent(document.getElementById('urlBox').value);
        }
    }

    function homePage() {
        console.log("Go Home");
        window.location.href = window.location.origin + window.location.pathname;
    }

    function addEventListeners() {
        document.getElementById('homeButton').addEventListener('click', homePage);
        document.getElementById('goButton').addEventListener('click', submit);
        document.getElementById('urlBox').addEventListener('keydown', function(event) {
            if (event.keyCode == 13 || event.keyCode == 10) {
                submit();
            }
        });
    }

    return function () {
        parseBase();
        parsePage();
        fixURLs();
        buildTOC();
        moveContent();
        addEventListeners();
    }
})());