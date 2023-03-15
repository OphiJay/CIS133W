<!DOCTYPE HTML>
<html>
    <head>
        <title>Survey Answers</title>
        <link rel="stylesheet" href="results.css">
        <script>
            var ANSWERS = <?php echo urldecode ($_POST['answers']); ?>;

            function buildResponseTable () {
                result = "";

                result += "<table>\n";
                result += "<tr><th>Section</th><th>Question</th><th>Response</th><th>Value</th></tr>";

                for (section in ANSWERS) {
                    for (question in ANSWERS[section]) {
                        for (response in ANSWERS[section][question]) {
                            result += "<tr><td>" + section + "</td>";
                            result += "<td>" + question + "</td>";
                            result += "<td>" + response + "</td><td>";
                            result += ANSWERS[section][question][response];
                            result += "</td></tr>\n"
                        }
                    }
                }
                result += "</table>"
                document.getElementById("responseTable").innerHTML = result;
            }

            window.addEventListener("load", buildResponseTable)
        </script>
    </head>
    <body>
        <h1>Thanks for completing the survey!</h1>
        <p>Here is a summary of your responses:</p>
        <div id="responseTable"></div>
    </body>
 </html>