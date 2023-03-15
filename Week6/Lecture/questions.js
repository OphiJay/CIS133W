console.log("PCC Survey Questions");

function createSurveyQuestions() {

    var q1 = new MultipleSelectOtherQuestion(
        "Status", 
        "What is your your status at PCC? ( select more than one if applicable)", 
        [
            "Full time student",
            "Part time student",
            "GED student",
            "High School dual enrollment",
            "International Student",
            "Work Study",
            "Full time Faculty",
            "Part time Faculty",
            "Full time staff",
            "Part time staff",
            "Management"
        ]
    );
    
    var q2 = new MultipleSelectQuestion(
        "Campus",
        "What location do you primarily spend your time when at PCC? (If equally split between campuses, check both)",
        [
            "Cascade Campus",
            "Rock Creek Campus",
            "Southeast Campus",
            "Sylvania Campus",
            "Online courses only",
            "Other PCC Center/location"
        ]
    );

    var q3 = new ShortAnswerQuestion(
        "Zip Code",
        "What is your zip code?"
    );

    var q11 = new MultipleChoiceOtherQuestion(
        "Current Housing Type",
        "What type of housing do you currently live in?",
        [
            "House",
            "Condominium/Townhouse",
            "Apartment",
            "Duplex",
            "Mobile Home",
            "Homeless (if yes skip to #16)"
        ]
    );

    var q12 = new MultipleChoiceQuestion(
        "Housing Ownership",
        "Is your living space rented or owned?",
        [
            "Rent",
            "Own"
        ]
    );

    var allQuestions = [q1, q2, q3, q11, q12];

    for (var i = 0; i < allQuestions.length; i++) {
        allQuestions[i].number = i +1;
    }


    ////

    var s1 = new QuestionSection("Demographics", [q1, q2, q3]);
    var s2 = new QuestionSection("Housing Information", [q11, q12]);

    var allSections = [s1, s2];

    for (var i = 0; i < allSections.length; i++) {
        allSections[i].number = i +1;
    }

    ////

    return new Survey("PCC Housing Survey", [s1, s2]);
}

