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

//var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+quiz.length);
	$('.question').html('<h2>' + quiz[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var _choices = $('<div>');
		_choices.text(quiz[currentQuestion].choices[i]);
		_choices.attr({'data-index': i });
		_choices.addClass('thisChoice');
		$('.answerList').append(_choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = quiz[currentQuestion].answerList[quiz[currentQuestion].answer];
	var rightAnswerIndex = quiz[currentQuestion].answer;
	$('#gif').html("<img src=" + quiz[questionNum].gif + " width = '300px' class='img-responsive'>");
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (quiz.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}