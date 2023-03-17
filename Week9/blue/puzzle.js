$ (   
    function () {
        var MARGIN = 2;
        var BORDER = 1;

        var tileWidth;
        var tileHeight;
        var extra = 2 * (MARGIN + BORDER);
        var fontSize; 

        var tiles = [
            [1, 2, 3, 4],
            [5, 6, 7, 8], 
            [9, 10, 11, 12],
            [13, 14, 15, null]
        ];

        var gapX = 3;
        var gapY = 3;

        var disableMove = false;
        var winBool = false;

        var moves = 0;

        function toggleWinScreen(w) {

            var board = $("#board")
            var screen = $("#winScreen");
            var button = $('#playAgainButton')
            winBool = w;
            if(!winBool) {
                screen.hide();
                board.css("opacity", 1)
            }
            if(winBool) {
                screen.show();
                board.css("opacity", .33);
                screen.css("fontSize", 0.6 * fontSize);
                button.css("fontSize", 0.2 * fontSize);

            }
        }

        function slideTile(tile, duration) {
            tile.animate({
                top: tile.data("y") * tileHeight,
                left: tile.data("x") * tileWidth
            }, duration || 200);

        }

        function down() {
            if (gapY > 0) {
                var tile = tiles[gapY - 1][gapX];
                tiles[gapY][gapX] = tile;
                tile.data("y", gapY);
                slideTile(tile);
                gapY = gapY - 1;
                tiles[gapY][gapX] = null;
            }
            moves ++;
        }

        function up() {
            if (gapY < 3) {
                var tile = tiles[gapY + 1][gapX];
                tiles[gapY][gapX] = tile;
                tile.data("y", gapY);
                slideTile(tile);
                gapY = gapY + 1;
                tiles[gapY][gapX] = null;
            }
            moves ++;
        }

        function right() {
            if (gapX > 0) {
                var tile = tiles[gapY][gapX - 1];
                tiles[gapY][gapX] = tile;
                tile.data("x", gapX);
                slideTile(tile);
                gapX = gapX - 1;
                tiles[gapY][gapX] = null;
            }
            moves ++;
        }

        function left() {
            if (gapX < 3) {
                var tile = tiles[gapY][gapX + 1];
                tiles[gapY][gapX] = tile;
                tile.data("x", gapX);
                slideTile(tile);
                gapX = gapX + 1;
                tiles[gapY][gapX] = null;
            }
            moves ++;
        }


        function positionTiles() {
            for (var x = 0; x < 4; x++) {
                for (var y = 0; y < 4; y++) {  
                    var tile = tiles[y][x];

                    if(tile) {
                        tile.css({
                            top: tile.data("y") * tileHeight,
                            left: tile.data("x") * tileWidth
                        });
                    }
                }
            }
        }

        function resize() {
            var margin = parseInt($("body").css("margin")) || 0;
            var windowWidth = $(window).width() - 2 * margin;
            var windowHeight = $(window).height() - 2 * margin;

            tileWidth = Math.floor(windowWidth / 4);
            tileHeight = Math.floor(windowHeight / 4);

            // console.log(tileWidth, tileHeight);

            fontSize = Math.min(tileWidth, tileHeight);


            // Set
            $(".tile").width(tileWidth - extra)
            .height(tileHeight - MARGIN - extra)
            .css("fontSize", 0.8 * fontSize)
            .css("borderRadius", 0.05 * tileWidth);

            positionTiles();

            var screen = $("#winScreen");
            var button = $('#playAgainButton');
            screen.css("fontSize", 0.6 * fontSize);
            button.css("fontSize", 0.2 * fontSize);


        }

        function initTiles() {
            var board = $('#board');
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {  
                    var value = y * 4 + x + 1
                    if (value < 16) {
                        var tile = $('<div class="tile">' + value + '</div>');
                        board.append(tile);
                        tile.data("x", x).data("y", y);
                        tiles[y][x] = tile;
                        if (x % 2) {
                            tile.css("backgroundColor", "darkcyan")
                        } else {
                            tile.css("backgroundColor", "darkslategray")
                        }
                    } 
                }
            }
        }

        function scramble() {
            for (var i = 0; i < 100; i++) {
                var r = Math.random();

                if (r < 0.25) {
                    up();
                } else if (r < 0.5) {
                    down()
                } else if (r < 0.75) {
                    left();
                } else {
                    right();
                }
            }
        }

        function keydown(evt) {
           // console.log(evt.which);
            switch(evt.which) {
                case 67: // c
                    disableMove = !disableMove;
                    break;
                case 86: // v
                    scramble();
                    break;
                case 88: // x
                    winBool = !winBool;
                    toggleWinScreen(winBool); 
                    break;
                case 90: // z
                    winSequence();
                    break;
                case 66: // b
                $(document).ready(function(){
                        location.reload(true);
                    });
                    break;
            }

            if (!disableMove){
                switch (evt.which) {
                    case 38: // up
                    case 87: // w
                        up();
                        break;
                    case 37: // left;
                    case 65: // a
                        left();
                        break;
                    case 39: // right
                    case 68: // d
                        right();
                        break;
                    case 40: // down;
                    case 83: // s
                        down();
                        break;

                }
                evt.stopPropagation();
                evt.preventDefault();
    
                checkWin()    
            }
            
        }
    
        function checkWin() {
            var numCorrect = 0;
            var rowOffset = 1;

            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {  
                    var tile = tiles[y][x];
                    if(tile) {
                        if(tiles[y][x][0].innerText == parseInt(x + rowOffset)) {
                            numCorrect ++;
                           // console.log("Correct Tile @ Row: ", y + 1, " Column: ", x + 1)
                        }
                    }
                }
                rowOffset += 4;
            }

            //console.log("Correct Tiles: ", numCorrect)
            if (numCorrect < 15) {
                numCorrect = 0;
            } else if(numCorrect == 15) {
                winSequence();
            }
        }

        function winSequence() {
            winBool = true;
            changeColor();
            disableMovement();
            moveTotal();
            toggleWinScreen(winBool);
            playAgain();

            function changeColor() {
                for (var y = 0; y < 4; y++) {
                    for (var x = 0; x < 4; x++) {  
                        var tile = tiles[y][x];
                        if (tile) {
                            if (x % 2) {
                                tile.css("backgroundColor", "black")
                            } else {
                                tile.css("backgroundColor", "gray")
                            } 
                        } 
                    }
                }
            }

            function disableMovement() {
                //console.log("stop movement")
                disableMove = true;
            }

            function moveTotal() {
                moveText = $('#moveTotal');
                var moveTotal = moves - 100;
                moveText.text("Moves: " + moveTotal);
                //console.log(moveTotal);
            }

            function playAgain() {
                $(document).ready(function(){
                    $("button").click(function(){
                        location.reload(true)
                    });
                  });
            }
        }

        return function(evt) {
                $(window).resize(resize);
                $(document).keydown(keydown);
                initTiles();
                resize();
                scramble();
                toggleWinScreen(winBool);
        }
    } ()
);