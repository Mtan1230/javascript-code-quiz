//select elements
const timeEl = document.getElementById("timer");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const userInit = document.querySelector("#initial");
const scoreList = document.querySelector("#score-list");
const cardEl = document.querySelectorAll(".card");
const nextBtn = document.querySelectorAll(".next-btn");


const returnBtn = document.getElementById("return-btn");
const clearBtn = document.getElementById("clear-btn");

const newScore = {
    initial: "",
    highScore: 0,
};

let secLeft = 75;
let score = 0;
let cardIndex = 0;

//load local storage
const lastScore = JSON.parse(localStorage.getItem("score"));
if (lastScore) {
    displayScore(lastScore.initial, lastScore.highScore);
}

//set interval
function startQuiz() {
    const timeInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secLeft;
        secLeft--;
    if (secLeft <= 0) {
        timeEl.textContent = "";
        clearInterval(timeInterval);
        endQuiz();
        cardEl[cardIndex].setAttribute("data-state", "hidden");
        cardIndex = 6;
        cardEl[cardIndex].setAttribute("data-state", "display");
    }
    }, 1000);
}

//display answer
function checkAnswer(event) {
    const choice = event.target.getAttribute("data-answer");
    const correctAnswer = event.target.parentNode.querySelector('[data-answer="Correct"]');
    if(choice === "Wrong") {
        secLeft -= 15;
        answerEl.textContent = choice + "! Correct answer is " + correctAnswer.textContent;
    } else {
        answerEl.textContent = choice + "!";
    }
}

//show result
function endQuiz() {
    if (secLeft > 0) {
        score = secLeft;
        secLeft = 0;
    }
    resultEl.textContent = "Your final score is: " + score;
}

//save initial and score 
function saveScore(event) {
    event.preventDefault();
    newScore.initial = userInit.value;
    newScore.highScore = score;
    displayScore(newScore.initial, newScore.highScore);
    //save new user or update user's highscore
    switch (true) {
        case (lastScore === null):
        case (newScore.initial !== lastScore.initial):
        case (newScore.initial === lastScore.initial && newScore.highScore > lastScore.highScore):
            localStorage.setItem("score", JSON.stringify(newScore));
            break;
        default:
            break;
    }
}

function displayScore(initial, highScore) {
    const listEl = document.createElement("li");
    listEl.innerText = initial + " - " + highScore;
    scoreList.appendChild(listEl);
}

function clearScore() {
    
}

function next() {
    cardEl[cardIndex].setAttribute("data-state", "hidden");
    cardIndex++;
    cardEl[cardIndex].setAttribute("data-state", "display");

    switch (cardIndex) {
        case 1:
            startQuiz();
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            checkAnswer(event);
            break;
        case 6:
            checkAnswer(event);
            endQuiz();
            break;
        case 7:
            saveScore(event);
            break;
        default:
            break;
    }
}

//event listeners
nextBtn.forEach(function(btn) {
    btn.addEventListener("click", next);
});

returnBtn.addEventListener("click", function() {
    document.reload();
})

clearBtn.addEventListener("click", clearScore);