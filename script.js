var startButton = document.getElementById("startQuiz");
var quizRules = document.getElementById("quizRules");
var initialPage = document.getElementById("initialPage");
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
    countTimer();
    getQuestion();
    quizBox.style.display = "inline-flex";
    completedQuiz.style.display = "none";

    if (quizRules.style.display === "none") {
        quizRules.style.display = "block";
    } else {
        quizRules.style.display = "none";
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

// Name submission function
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    var textName = enterName.value.trim();
    if (textName === "") {
        return;
    }

    var highScoreString = (textName + "  -  " + finalScore);
    finalScore = "";
    scores.push(highScoreString);
    enterName.value = "";

    savedScores = JSON.parse(localStorage.getItem("scores"));
    if (savedScores) {
        scores = savedScores.concat(scores);
    };

    saveScore();

    highScoreContainer.style.display = "inline-flex";

    postHighScores();

})

// Function to save in local storage
function saveScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

// Function to see saved high scores 
function viewHighScore() {
    completedQuiz.style.display = "none";
    quizRules.style.display = "none";
    initialPage.style.display = "none";
    quizBox.style.display = "none";
    answerBox.style.display = "none";

    scores = JSON.parse(localStorage.getItem("scores"));

    showHighScores();

    return;

}
 
// Show the high scores
function showHighScores() {
    completedQuiz.style.display = "none";
    highScoreContainer.style.display = "block";

    highScoreHeader.textContent = "High Scores"
    highScoreContainer.appendChild(highScoreHeader);

    $(highScoreList).empty();

    for (var n = 0; n < scores.length; n++) {
        var score = scores[n];
        var newScore = document.createElement("p");
        newScore.textContent = score;
        newScore.setAttribute("data-index", n);
        highScoreList.appendChild(newScore);
    }
    highScoreHeader.appendChild(highScoreList);
    highScoreList.appendChild(highScoreButton);

}

// Delete the high scores
function deleteList() {
    localStorage.removeItem("scores");

    highScoreHeader.textContent = "High Scores";
    highScoreContainer.appendChild(highScoreHeader);
    highScoreHeader.appendChild(highScoreButton);

    $("#highScoreList").empty();

    savedScores = [];
    scores = [];

}

// Restart the quiz
function startOver() {
    setTimer = (questions.length * 15);
    i = 0;
    scores = [];
    $("highScoreList").empty();
    savedScores = JSON.parse(localStorage.getItem("scores"))

    countTimer();

    quizBox.style.display = "inline-flex";
    initialPage.style.display = "inline";
    completedQuiz.style.display = "none";
    highScoreContainer.style.display = "none";

    getQuestion();

}

// Setting the timer
function countTimer() {
    var timeInterval = setInterval( function() {
        timerE1.textContent = "Timer : " + setTimer;

        if (setTimer === 0) {
            clearInterval(timeInterval);
            getCompleted();
        }

        if (i === questions.length) {
            clearInterval(timeInterval);
            finalScore = setTimer;
        }

        if (setTimer <= 0) {
            setTimer = 0;
            clearInterval(timeInterval);
            getCompleted();
        }

        setTimer--;

    }, 1000)
}
