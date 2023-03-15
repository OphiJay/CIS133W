// Global Vars
var REQUIRED_PASSWORD_CHARACTERS="!@~#$%^&*+=";

// Input
function getInputValue(id) {
    return document.getElementById(id).value;
}

// Messages
function setMessage(id, message) {
    var messageBox = document.getElementById(id);
    messageBox.innerText = message;
}

function clearMessage(id) {
    setMessage(id,"");
}

// Character Checks
function isLower(character) {
   return (character >= "a" && character <= "z");
}

function isUpper(character) {
    return (character >= "A" && character <= "Z");
}

function isDigit(character) {
    return (character >= "0" && character <= "9");
}

function isSpecial(character) {

   return (REQUIRED_PASSWORD_CHARACTERS.indexOf(character) >=0);
}

function validateLength(value) {
    if (value == ""){
        setMessage("passwordMessage","Password must be at least 8 characters," +
                 " with at least 1 uppercase, 1 number, and 1 character from '" 
                 + REQUIRED_PASSWORD_CHARACTERS + "'");

    }
    if (value.length < 8) {
        setMessage("passwordMessage", "Password must be at least 8 characters");
    }
}

function isValidUsernameCharacter(character) {
   return (isLower(character) || isUpper(character) || isDigit(character))
}

// Req Checks
function checkUserNameReqs(value) {
    if (value == ""){
        setMessage("userNameMessage", "UserName must be 1 or more alphanumeric characters");
    } 

    for(i = 0; i < value.length; i++){
        var character = value.charAt(i);

        if(!isValidUsernameCharacter(character))
        {
            setMessage("userNameMessage", "Character '" + character + "' is invalid");
        }
    }
}

function checkPasswordReqs(value) {
    var hasUpper = false;
    var hasDigit = false;
    var hasSpecial = false;

    for(i = 0; i < value.length; i++) {
        var character = value.charAt(i);

        if(isUpper(character)){
            hasUpper = true;
        }else if (isDigit(character)){
            hasDigit = true;
        } else if (isSpecial(character)) {
            hasSpecial = true;
        }
    }

    if (!hasUpper){
        setMessage("passwordMessage","Password must have at least one uppercase letter");
    } else if (!hasDigit){
        setMessage("passwordMessage","Password must have at least one number");
    } else if (!hasSpecial){
        setMessage("passwordMessage","Password must have at least one character from '" 
                    + REQUIRED_PASSWORD_CHARACTERS +"'");
    }
}

// Validate
function validateUserName(){
    var value = getInputValue("userName");
    clearMessage("userNameMessage");
    checkUserNameReqs(value);
   
}

function validatePassword(){
    var value = getInputValue("password");
    clearMessage("passwordMessage");
    validateLength(value);
    checkPasswordReqs(value);
    
}

window.addEventListener("load", function () {
    document.getElementById("userName").addEventListener("input", validateUserName);
    document.getElementById("password").addEventListener("input", validatePassword);
});


