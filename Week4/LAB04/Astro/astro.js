window.addEventListener("load", astroCalc)

// Main 
function astroCalc() {
    var MONTHS = createMonths()

    var month = getInput("monthSelect");
    var day = getInput("daySelect");

    var isValid = checkValidDate(month, day);

    if (isValid) {

        var sign = setSign(month, day, MONTHS);

        var signElement = setElement(sign);
        var signRep = setRep(sign);
        var signEmoji = setEmoji(sign);

        var theme = setTheme(signElement);
        setBackground(theme);

        setText(sign, signElement, signRep, signEmoji);
        
        console.log(sign, signElement, theme);

    } else if (month == 0 || day == 0) {

        console.log("NO DATE ENTERED");

    } else {

        console.log("INVALID DATE");
        window.alert("Invalid Date Entered\nPlease Try Again")
    }
}

// Month Object
function Month (m, d, s1, s2){
    this.monthNum = m,
    this.splitDay = d,
    this.sign1 = s1,
    this.sign2 = s2
}

function createMonths() {
    // Create Month Objects
    var MONTHS = [
    Jan = new Month(1, 19, "Capricorn", "Aquarius"),
    Feb = new Month(2, 18, "Aquarius", "Pisces"),
    Mar = new Month(3, 20, "Pisces", "Aries"),
    Apr = new Month(4, 19, "Aries", "Taurus"),
    May = new Month(5, 20, "Taurus", "Gemini"),
    Jun = new Month(6, 20, "Gemini", "Cancer"),
    Jul = new Month(7, 22, "Cancer", "Leo"),
    Aug = new Month(8, 22, "Leo", "Virgo"),
    Sep = new Month(9, 22, "Virgo", "Libra"),
    Oct = new Month(10, 22, "Libra", "Scorpio"),
    Nov = new Month(11, 21, "Scorpio", "Sagittarius"),
    Dec = new Month(12, 21, "Sagittarius", "Capricorn"),   
    ]
    return MONTHS;
}

function getInput(id) {
    var selector = document.getElementById(id);
    var value = selector.value;
    console.log(value);
return value;
}

function checkValidDate(m, d) {

    if (d == 0 || m == 0) {
        return false;
    } else if (m == 2 && d > 29) {
        return false;
    } else if ( (m == 4 || m == 6 || m == 9 || m == 11) && d > 30) {
        return false;
    } else {
        return true;
    }
}

function setSign(m, d, MONTHS) {
    var sign = "";

    for (var i = 0; i < 12; i++) {
        if (m == MONTHS[i].monthNum) {
            if (d <= MONTHS[i].splitDay) {
                sign = MONTHS[i].sign1;
            } else {
                sign = MONTHS[i].sign2;
            }
        }
    }
    return sign;
}

function setElement(s) {
    var signElement = "";

    if (s == "Aries" || s == "Leo" || s == "Sagittarius") {
        signElement = "Fire";
    } else if (s == "Taurus" || s == "Virgo" || s == "Capricorn") {
        signElement = "Earth";
    } else if (s == "Gemini" || s == "Libra" || s == "Aquarius") {
        signElement = "Air";
    } else if (s == "Cancer" || s == "Scorpio" || s == "Pisces") {
        signElement = "Water";
    }
    return signElement;
}

function setRep(s) {
    var rep = "";

    if (s == "Capricorn") {
        rep = "Goat";
    } else if (s == "Aquarius") {
        rep = "Water-Bearer";
    } else if (s == "Pisces") {
        rep = "Fish";
    } else if (s == "Aries") {
        rep = "Ram";
    } else if (s == "Taurus") {
        rep = "Bull";
    } else if (s == "Gemini") {
        rep = "Twins";
    } else if (s == "Cancer") {
        rep = "Crab";
    } else if (s == "Leo") {
        rep = "Lion";
    } else if (s == "Virgo") {
        rep = "Maiden";
    } else if (s == "Libra") {
        rep = "Scales";
    } else if (s == "Scorpio") {
        rep = "Scorpion";
    } else if (s == "Sagittarius") {
        rep = "Archer";
    }
    return rep;
}

function setEmoji(s) {
    var emojis = [];

    if (s == "Capricorn") {
        emojis = ["♑","🌱","🐐"];
    } else if (s == "Aquarius") {
        emojis = ["♒","☁️","🏺"];
    } else if (s == "Pisces") {
        emojis = ["♓","💧","🐟"];
    } else if (s == "Aries") {
        emojis = ["♈","🔥","🐏"];
    } else if (s == "Taurus") {
        emojis = ["♉","🌱","🐂"];
    } else if (s == "Gemini") {
        emojis = ["♊","☁️","🧑‍🤝‍🧑"];
    } else if (s == "Cancer") {
        emojis = ["♋","💧","🦀"];
    } else if (s == "Leo") {
        emojis = ["♌","🔥","🦁"];
    } else if (s == "Virgo") {
        emojis = ["♍","🌱","👧"];
    } else if (s == "Libra") {
        emojis = ["♎","☁️","⚖️"];
    } else if (s == "Scorpio") {
        emojis = ["♏","💧","🦂"];
    } else if (s == "Sagittarius") {
        emojis = ["♐","🔥","🏹"];
    }
    return emojis;
}

function setTheme(e) {
    var theme = "";

    if (e == "Fire") {
        theme = "Maroon";
    } else if (e == "Earth") {
        theme = "Olive";
    } else if (e == "Air") {
        theme = "MediumPurple";
    } else if (e == "Water") {
        theme = "SteelBlue";
    } else {
        theme = "White";
    }

    return theme;
}

function setBackground(t) {
    document.body.style.backgroundColor = t;
}

function setText(s, e, r, m) {
    var signText = document.getElementById("signText");
    var elemText = document.getElementById("elemText");
    var repText = document.getElementById("repText");

    signText.innerHTML = "Your Sign Is " + s + " " + m[0];
    elemText.innerHTML = "Your Element Is " + e + " " + m[1];
    repText.innerHTML = "You Are Represented By The " + r + " " + m[2];

}
