<?php
  $url  = isset($_GET['url']) ? $_GET['url'] : "http://eloquentjavascript.net/";
  $contents = base64_encode(mb_convert_encoding(file_get_contents($url), "HTML-ENTITIES", "UTF-8"));


?>

<!DOCTYPE html>
<html>
    <head>
        <title>LAB 06 | DOM</title> 
        <link rel="stylesheet" href="fetch_page.css">
        <script src="fetch_page.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
        <script>
            var BASE = "<?php echo $url; ?>";
            var PAGE = "<?php echo $contents; ?>";
        </script>
    </head>
    <body>
        <div id="pageHeader"><h1>Welcome to Eloquent Javascript Portal</h1></div>
        <div id="searchBox">Type a URL here: <input type="text" id="urlBox"> 
        <span id='goButton'>GO</span><span id='homeButton'>HOME</span>
        </div>
        <div id="tocContainer">
            <div id="toc"></div>
            <hr>
        </div>
        <div id="contents"></div>
    </body>
</html>