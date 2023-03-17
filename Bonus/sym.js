$(
  function () {

    var charArr = [];
    var revArr = [];
    var isSym;

    function runCheck() {
      var s = getInput();
      var isSym = (checkSym(s));
      console.log(isSym);
      displayResult();
    }

    function getInput() {
      var str = $('#inBox').val();
      console.log(str);
      return str;
    }

    function keydown(evt) {
      if(evt.which == 13) {
        runCheck();
      }
    }
 
    function checkSym(s) {
      var str = s.toLowerCase();
      str = str.replaceAll(' ','');
    
      charArr = Array.from(str);
      console.log(charArr)
      revArr = Array.from(str).reverse();
      console.log(revArr)
    
      for (var i = 0; i < charArr.length; i ++) {
        if (charArr[i] != revArr[i]){
          isSym = false;
          break
        } else {
          isSym = true;
        }
      }
      return isSym;
    }

    function displayResult() {
      if (isSym) {
        $('#result').text('Symetrical')
        .css('color', 'white');
      } else {
        $('#result').text('Not Symetrical')
        .css('color', 'darkred');
      }
    }
    
    return function () {
      $(document).keydown(keydown);
      $('#goButton').click(runCheck);
    } 

  } ()
);









