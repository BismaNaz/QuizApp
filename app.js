function Question (text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
}

Question.prototype.correctAnswer = function(choice) {
	return choice === this.answer;
}
/* End of Object Constructor function for Question Object */

/* Object Constructor function for Quiz Object */

function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;

	
}

Quiz.prototype.getQuestionIndex = function() {
	return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function() {
	return this.questions.length === this.questionIndex; 

}

Quiz.prototype.guess = function(answer) {
	
	if(this.getQuestionIndex().correctAnswer(answer)) {
		this.score++; 
	}

	this.questionIndex++; 
}

/* end Object Constructor function for Quiz Object */

/*questions is an array where each element of this array is an object*/
var questions = [
	new Question("The national language of Pakistan is:", ["Pushto", "English","Urdu", "Punjabi"], "Urdu"),
    new Question("When Pakistan won the Cricket World Cup:", ["1992", "1996", "1999", "2003"], "1992"),
    new Question("Who is the national poet of Pakistan?", ["Allama Iqbal", "Hafeez Jallandri","Faiz Ahmed Faiz", "Ahmed Faraz"], "Allama Iqbal"),
    new Question("Who composed the verses of Pakistan national Anthem?", ["Hafeez Jallandri", "Nasir Kazmi", "Allama Iqbal", "Faiz Ahmed Faiz"], "Hafeez Jallandri"),
    new Question(" FIA (Federal Investigation Agency) was formed in:", ["13 January 1973", "23 March 1973", "13 January 1975", "None of These"], "13 January 1975"),
];


var quiz = new Quiz(questions); // Initialization of Quiz Constructor object by passing questions array

/*This function will populate the questions and choices through HTML DOM object methods*/
function populate() {
	if(quiz.isEnded()) {
		showScores();

	}
	else {
		//show question
		var element = document.getElementById("ques");
		element.innerHTML = quiz.getQuestionIndex().text;

		//show choices
		var choices = quiz.getQuestionIndex().choices;
		for (var i = 0; i < choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}

		showProgress();
	}
}

populate(); //calling of populate function

//guess function  is use to accept user's answer and to check for its correctness
function guess(id, guess) {
	var button = document.getElementById(id);
	button.onclick = function() {
		quiz.guess(guess);
		populate();
	}

}

// The function will show the progress of questions (eg. 1 of 5)
function showProgress() {
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML =  '<div class="progress-number">' +currentQuestionNumber +'</div>' + " of " + '<div class="progress-number">' + quiz.questions.length +'</div>';
}

// This function will show result at the end of the quiz
function showScores() {
	var gameOver = "<h1 id='result'>Result</h1>";  
	 gameOver += "<h2 id='score' style='text-align:center; color:rgba(165, 42, 42, 0.774);'>Your Score: " + quiz.score + " out of 5 </h2>";
	var element = document.getElementById("quiz");
	element.innerHTML = gameOver;

}