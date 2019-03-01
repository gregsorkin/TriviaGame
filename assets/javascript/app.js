// GLOBAL VARIABLES

/* Questions, Choices, Answers, Displayed Image */
let quiz = [{
    question: "What is Homer’s favorite Beer?",
    choices: ["Fudd", "Duff", "Skittlebraü", "Tüborg"],
    answer: "Duff",
    gif: "assets/images/duff.gif"
},
{
    question: "Which of these jobs has Homer NOT had?",
    choices: ["Astronaut", "Mascot", "Hollywood Assistant", "Choreographer"],
    answer: "Choreographer",
    gif: "assets/images/dance.gif"
},
{
    question: "What is Bart’s best friend’s name?",
    choices: ["Milhouse Van Houten", "Millhouse Van Houten", "Thrillhouse Van Houten", "Milhouse Van Hooten"],
    answer: "Milhouse Van Houten",
    gif: "assets/images/milhouse.gif"
},
{
    question: "Who is Nelson Muntz’s favorite singer?",
    choices: ["Barbra Streisand", "Tom Jones", "Dolly Parton", "Andy Williams"],
    answer: "Andy Williams",
    gif: "assets/images/andyWilliams.gif"
},
{
    question: "Who has tried to kill Bart numerous times?",
    choices: ["Sideshow Bob", "Sideshow Mel", "Mr. Teeny", "Krusty the Clown"],
    answer: "Sideshow Bob",
    gif: "assets/images/sideshowBob.gif"
},
{
    question: "Who shot Mr. Burns?",
    choices: ["Tito Puente", "Waylon Smithers", "Maggie Simpson", "Homer Simpson"],
    answer: "Maggie Simpson",
    gif: "assets/images/maggieShoot.gif"
},
{
    question: "What was the name of the Be Sharps’ hit song?",
    choices: ["'Can I Borrow a Feeling?'", "'Dr. Zaius'", "'Call C. Everett Koop'", "'Baby on Board'"],
    answer: "'Baby on Board'",
    gif: "assets/images/beSharps.gif"
},
{
    question: "Which word from The Simpsons has NOT been added to the Oxford English Dictionary?",
    choices: ["D'oh", "Meh", "Sacrilicious", "Cromulent"],
    answer: "Sacrilicious",
    gif: "assets/images/sacrilicious.gif"
},
{
    question: "What is Marge's maiden name?",
    choices: ["Bouvier", "Van Doren", "Carter", "Reagan"],
    answer: "Bouvier",
    gif: "assets/images/mrsBouvier.gif"
},
{
    question: "As of February 2019, how many Treehouse of Horror installments have there been?",
    choices: ["XIII", "XXX", "LXI", "XXIX"],
    answer: "XXIX",
    gif: "assets/images/treehouseOfHorror.gif"
},
]

/* Counters */
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let clock;
let timer;
let options;
let questionNum = 0;
//let notAnswered;
//let answered;
let userGuess;


// FUNCTIONS

/* (Re)Start Buttons and Hide Functions */
$("#startBtn").click(function() {
	$(this).hide();
    resetGame();
});

$("#startOver").click(function() {
	$(this).hide();
    resetGame();
});


/* Reset Functions */
function resetGame() {
    clock = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    questionNum = 0;
    //countdown();
    $(".reset").hide();
    $("#scorecardCorrect").empty();
    $("#scorecardInorrect").empty();
    $("#scorecardUnanswered").empty();
    showQuestion();
}


/* Timer Function */
function countdown() {
    clock = 16;
    if (clock > 2) {  
        $("#timer").text("Time Remaining: " + clock + " Seconds");
    } else {
        $("#timer").text("Time Remaining: " + clock + " Second");
    }
    timer = setInterval(countdownTicker, 1000);
}

function countdownTicker() {
    clock--;
    if (clock < 1) {
        clearInterval(timer);
        $("#correctIncorrect").text("Out of time!");
        unanswered++;
        nextQuestion();
    }    
  }


/* Question Array Loops */
function showQuestion () {
    countdown();
    $("#question").append(quiz[questionNum]);
    for (let j = 0; j < 4; j++) {
        let options = $("<div>");
        options.text(quiz[questionNum].choices[j]);
        options.attr({"data-index": j});
        options.addClass("selected");
        $("#choices").append(options);
    }

    // User makes their guess here, which will also stop the timer from continuing
    $(".selected").click(function() {
        userGuess = $(this).data("index");
        clearInterval(timer);
        selections();
    });


function selections() {
    $("#question").empty();
    $("#choices").empty();
    $(".selected").empty();

    $("#answer").text("The correct answer is " + quiz[questionNum].answer);
    if (userGuess === (quiz[questionNum].answer)) {
        $("#correctIncorrect").text("You got it!");
        correct++;
    } else if (userGuess !== (quiz[questionNum].answer)) {
        $("#correctIncorrect").text("Good guess! But the answer is " + quiz[questionNum].answer);
        incorrect++;
    } else {
        $("#correctIncorrect").text("You ran out of time! The correct answer was " + quiz[questionNum].answer);
        unanswered++;
    }

    $("#choices").on("click", function() { 
        $("#gifs").append("<img src=" + quiz[questionNum].gif + " width = '300px' class='img-responsive'>");
    });

    if (questionNum == quiz.length - 1) {
        setTimeout(scorecard, 5000);
    } else {
        questionNum++;
        setTimeout(nextQuestion, 5000);
    }
    nextQuestion();

}

function nextQuestion() {
    questionNum++;
    $("#gifs").empty();
    $("#correctIncorrect").empty();
    $("#answer").empty();
    setTimeout(showQuestion, 5000);
    if (questionNum === 10) {
        scorecard();
    }
}


/* Final Scorecard */
function scorecard() {
        $("#gif").empty();
        $("#correctIncorrect").empty();
        $("#answer").empty();
        $("#question").empty();
        $("#choices").empty();
        $("#scorecardCorrect").text("You got " + correct + " questions right");
        $("#scorecardIncorrect").text("You got " + incorrect + " questions wrong");
        $("#scorecardUnanswered").text("You left " + unanswered + " questions unanswered");
        // Convert start button into Start Over button:
        $("#startOver").show("#startBtn");
        $("#startOver").addClass("reset");
        $("#startOver").html("Play Again?");
}

};