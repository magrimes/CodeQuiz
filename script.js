var startButton = document.getElementById("startQuiz");
var quizRules = document.getElementById("quizRules");
var quizBox = document.getElementById("quizBox");
var quizQuestions = document.getElementById("question");
var quizChoices = document.getElementById("choices");
var answerBox = document.getElementById("ansMessage");
var answer = document.getElementById("listAns");
var completed = document.getElementById("completedMessage");
var finalScoreMessage = document.getElementById("finalScoreMessage");
var playerName = document.getElementById("playerName");

var nameField = document.querySelector("#nameField");
var submitButton = document.querySelector("#submitButton");
var highScoreContainer = document.querySelector("#highScoreContainer");
var highScoreHeader = document.querySelector("#highScoreHeader");
var highScoreList = document.querySelector("#highScoreList");
var displayHS = document.querySelector("#displayHS");
var highScoreButton = document.querySelector("#highScoreButton");
var completedQuiz = document.querySelector("#completedContainer");
var timerE1 = document.querySelector(".timer");

var scores = [];
var setTimer = 0;
var finalScore = 0;
var i = 0;
var savedScores = "";

// Start Quiz
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    setTimer = (questions.length * 15);
    timerCount();
    getQuestion();
    quizBox.style.display = "inline-flex";
    completedQuiz.style.dispaly = "none";

    if (quizRules.style.display === "none") {
        quizRules.style.display = "block";
    } else {
        quizRules.style.dispaly = "none";
    }
})

// Get Questions
function getQuestion() {

    answerBox.style.display = "none";

    if (i === questions.length) {
        getCompleted();
        return;
    }

    quizQuestions.innerHTML = "";
    var getQuestions = questions[i].title;
    var p = document.createElement("p");
    p.textContent = getQuestions;
    p.setAttribute("question", i);
    quizQuestions.appendChild(p);
    getChoices();

}

// Get Choices
function getChoices() {

    for (var j = 0; j < 4; j++) {
        var listAnswers = questions[i].choices[j];
        var p = document.createElement("p");
        p.textContent = listAnswers;
        p.setAttribute("answerChoice", j)

        var button = document.createElement("button");
        button.textContent = listAnswers;
        button.setAttribute("answerChoice", j);
        quizQuestions.appendChild(button)
    
    }

}

// Selecting an answer and adjusting timer
quizQuestions.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) {
        var index = element.getAttribute("answerChoice");
        answerBox.style.display = "inline-flex";
    }

    if (questions[i].choices[index] === questions[i].answer) {
        answer.appendChild(message);
        i++
        setTimeout(getQuestion, 1000);
    } else {
        answer.innerHTML = "";
        var messageWrong = document.createTextNode("Wrong");
        answer.appendChild(messageWrong);

        setTimer -= 10;

        if (setTimer <= 0) {
            setTimer = 0;
            getCompleted();
        }
        i++
        setTimeout(getQuestion, 1000);
    }
    event.stopPropagation();
})

// Final score is the remaining time

function getCompleted() {
    quizBox.style.display = "none";
    answerBox.style.display = "none";
    completedQuiz.style.display = "inline";

    var nameField = innerHTML = "";

    completed.textContent = ("You have completed the quiz!");
    finalScoreMessage.textContent = ("Your final score is " + finalScore);
    playerName.textContent = ("Enter your name: ");
}

// Name submission























