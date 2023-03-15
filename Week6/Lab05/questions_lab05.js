function createSurveyQuestions() {

    // Create Questions
    var q1 = new MultipleChoiceQuestion(
        "Age", 
        "Please select your age range:", 
        [
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65+"
        ]
    );
    
    var q2 = new MultipleSelectOtherQuestion(
        "Gender Identity",
        "How do you identify?",
        [
            "Male",
            "Female",
            "Non-Binary",
            "Prefer Not To Answer"
        ]
    );

    var q3 = new ShortAnswerQuestion(
        "Zip Code",
        "What is your zip code?"
    );

    var q4 = new MultipleSelectQuestion(
        "Apps",
        "Which of these apps do you use?",
        [
            "TikTok",
            "Instagram",
            "Facebook",
            "Twitter",
            "Snapchat",
            "YouTube"
        ]
    );

    var q5 = new ShortAnswerQuestion(
        "Most Used App",
        "Which of the above apps do you use the most?"
    );

    var q6 = new MultipleChoiceQuestion(
        "Frequency",
        "How often do you check your favorite app on a daily basis?",
        [
            "0 - I don't check it every day",
            "1-2",
            "3-4",
            "5-6",
            "7+"
        ]
    );

    var q7 = new ShortAnswerQuestion(
        "Feeling",
        "In one word, how does this app make you feel?"
    );

    // Number Questions
    var allQuestions = [q1, q2, q3, q4, q5, q6, q7];

    for (var i = 0; i < allQuestions.length; i++) {
        allQuestions[i].number = i +1;
    }

    // Create Sections
    var s1 = new QuestionSection("Demographics", [q1, q2, q3]);
    var s2 = new QuestionSection("Social Media Use", [q4, q5, q6, q7]);

    // Number Sections
    var allSections = [s1, s2];

    for (var i = 0; i < allSections.length; i++) {
        allSections[i].number = i +1;
    }

    // Return Survey
    return new Survey("Social Media Use Survey", [s1, s2]);
}

