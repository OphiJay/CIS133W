function changeChooser() {
    var chooser = document.getElementById("astroChooser");
    var options = chooser.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        document.getElementById(options[i].value).style.display = "";

        if ((options[i].label == "Taurus")||(options[i].label == "Virgo")||(options[i].label == "Capricorn")) {
          document.body.style.backgroundColor = "Olive";
          document.body.style.color = "white";
        } else if ((options[i].label == "Aries")||(options[i].label == "Leo")||(options[i].label == "Sagittarius")) {
          document.body.style.backgroundColor = "Maroon";
          document.body.style.color = "white";
        } else if ((options[i].label == "Cancer")||(options[i].label == "Scorpio")||(options[i].label == "Pisces")) {
          document.body.style.backgroundColor = "SteelBlue";
          document.body.style.color = "white";
        } else if ((options[i].label == "Gemini")||(options[i].label == "Libra")||(options[i].label == "Aquarius")) {
          document.body.style.backgroundColor = "MediumPurple";
          document.body.style.color = "white";
        } else {
          document.body.style.backgroundColor = "white";
          document.body.style.color = "black";
        }
      } else {
        document.getElementById(options[i].value).style.display ="none";
      }
    }
  }