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

//load local storage
const lastScore = JSON.parse(localStorage.getItem("score"));
const displayScore = document.createElement("li");
displayScore.innerText = lastScore.initial + " - " + lastScore.highestScore;
scoreList.appendChild(record);

const newScore = {
    initial: "",
    highestScore: 0,
};

let secLeft = 75;
let score = 0;
let cardIndex = 0;

function startQuiz() {
    //set interval
    const timeInterval = setInterval(function() {
        timeEl.textContent = "Time: " + secLeft;
        secLeft--;
    if (secLeft <= 0) {
        timeEl.textContent = "";
        clearInterval(timeInterval);
        endQuiz();
    }
    }, 1000);
}

function checkAnswer(event) {
    const choice = event.target.getAttribute("data-answer");
    const correctAnswer = event.target.parentNode.querySelector('[data-answer="Correct"]');
    if(choice === "Wrong") {
        secLeft -= 15;
        answerEl.textContent = choice + "! Correct answer is " + correctAnswer.textContent;
    } else if (choice === "Correct") {
        answerEl.textContent = choice + "!";
    }
}

function endQuiz() {
    if (secLeft > 0) {
        score = secLeft;
        secLeft = 0;
    }
    cardEl[cardIndex].setAttribute("data-state", "hidden");
    cardEl[6].setAttribute("data-state", "display");
    resultEl.textContent = "Your final score is: " + score;
}

function saveScore(event) {
    event.preventDefault();
    newScore.initial = userInit.value;
    newScore.highestScore = score;
    // highScore = highScore.concat(newScore);
    localStorage.setItem("score", JSON.stringify(newScore));
    console.log(newScore)
    highScore.push(newScore)
    console.log(highScore)
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