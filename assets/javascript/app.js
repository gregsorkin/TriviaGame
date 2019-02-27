// GLOBAL VARIABLES

/* Questions, Choices, Answers, Displayed Image */
let quiz = [{
    question: "What is Homer’s favorite Beer?",
    choices: ["Fudd", "Duff", "Skittlebraü", "Tüborg"],
    answer: "Duff",
    gif: "../images/duff.gif"
},
{
    question: "Which of these jobs has Homer NOT had?",
    choices: ["Astronaut", "Mascot", "Hollywood Assistant", "Choreographer"],
    answer: "Choreographer",
    gif: "../images/dance.gif"
},
{
    question: "What is Bart’s best friend’s name?",
    choices: ["Milhouse Van Houten", "Millhouse Van Houten", "Thrillhouse Van Houten", "Milhouse Van Hooten"],
    answer: "Milhouse Van Houten",
    gif: "../images/milhouse.gif"
},
{
    question: "Who is Nelson Muntz’s favorite singer?",
    choices: ["Barbra Streisand", "Tom Jones", "Dolly Parton", "Andy Williams"],
    answer: "Andy Williams",
    gif: "../images/andyWilliams.gif"
},
{
    question: "Who has tried to kill Bart numerous times?",
    choices: ["Sideshow Bob", "Sideshow Mel", "Mr. Teeny", "Krusty the Clown"],
    answer: "Sideshow Bob",
    gif: "../images/sideshowBob.gif"
},
{
    question: "Who shot Mr. Burns?",
    choices: ["Tito Puente", "Waylon Smithers", "Maggie Simpson", "Homer Simpson"],
    answer: "Maggie Simpson",
    gif: "../images/maggieShoot.gif"
},
{
    question: "What was the name of the Be Sharps’ hit song?",
    choices: ["'Can I Borrow a Feeling?'", "'Dr. Zaius'", "'Call C. Everett Koop'", "'Baby on Board'"],
    answer: "'Baby on Board'",
    gif: "../images/beSharps.gif"
},
{
    question: "Which word from The Simpsons has NOT been added to the Oxford English Dictionary?",
    choices: ["D'oh", "Meh", "Sacrilicious", "Cromulent"],
    answer: "Sacrilicious",
    gif: "../images/sacrilicious.gif"
},
{
    question: "What is Marge's maiden name?",
    choices: ["Bouvier", "Van Doren", "Carter", "Reagan"],
    answer: "Bouvier",
    gif: "../images/mrsBouvier.gif"
},
{
    question: "As of February 2019, how many Treehouse of Horror installments have there been?",
    choices: ["XIII", "XXX", "LXI", "XXIX"],
    answer: "XXIX",
    gif: "../images/treehouseOfHorror.gif"
},
]

/* Counters */
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let clock = 16;
let timer;
let questionNum = 0;
let notAnswered;
let answered;


// FUNCTIONS

/* Buttons Hide Functions */
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
    $(".reset").hide();
    $("#scorecardCorrect").empty();
    $("#scorecardInorrect").empty();
    $("#scorecardUnanswered").empty();
}

/* Timer Function */
timer = setInterval(countdown, 1000); 

function countdown() {
  clock--;
    if (clock < 1) {
        clearInterval(timer);
        clock = 16;
        answered = false;
    }
  if (clock > 2) {  
    $("#timer").text("Time Remaining: " + clock + " Seconds");
  } else {
    $("#timer").text("Time Remaining: " + clock + " Second");
  }

  if (clock < 1) {
    $("#correctIncorrect").text("Out of time!");
    unanswered++;
    nextQuestion();

  }
}


/* Question Array Loops */
function showQuestion () {
    for (let i = 0; i < quiz.length; i++) {
        $("#question").text(quiz[this.counter]);
        console.log(quiz[i].question);
        for (let j = 0; j < quiz[i].choices.length; j++) {
            $("#choices").text(quiz[i].choices[j]);
            console.log(quiz[i].choices);
        }
    }
    $("#answer").click(text("The correct answer is " + quiz[i].answer));
    if (this === (quiz[i].answer)) {
        $("#correctIncorrect").text("You got it!");
        correct++;
    } else {
        $("#correctIncorrect").text("Good guess! But the answer is " + quiz[i].answer);
        incorrect++;
    }
    $("#gifs").click(append(quiz[i].gif));
}

function nextQuestion() {
    questionNum++;
    $("#gif").empty();
    $("#correctIncorrect").empty();
    $("#answer").empty();
    setTimeout(showQuestion(), 5000);
    if (quiz[i].length === 10) {
        scorecard();
    }
}


/* Final Scoreboard */
function scorecard() {
        $("#gif").empty();
        $("#correctIncorrect").empty();
        $("#answer").empty();
        $("#question").empty();
        $("#choices").empty();
        $("#scorecardCorrect").text("You got " + correct + " questions right");
        $("#scorecardIncorrect").text("You got " + incorrect + " questions wrong");
        $("#scorecardUnanswered").text("You left " + unanswered + " questions unanswered");
        $("#startOver").show();
        $("#startOver").addClass("reset");
        $("#startOver").html("Play Again?");
}




