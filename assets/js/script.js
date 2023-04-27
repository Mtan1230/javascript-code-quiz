//select elements
const timeEl = document.getElementById("time");
const cardEl = document.querySelectorAll(".card");
const nextBtn = document.querySelectorAll(".next-btn");
const showAnswer = document.getElementById("answer");
const result = document.getElementById("result");
const highScore = localStorage.getItem("score");
const returnBtn = document.getElementById("return-btn");
const clearBtn = document.getElementById("clear-btn");

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
        showAnswer.textContent = choice + "! Correct answer is " + correctAnswer.textContent;
    } else if (choice === "Correct") {
        showAnswer.textContent = choice + "!";
    }
}

function endQuiz() {
    if (secLeft > 0) {
        score = secLeft;
        secLeft = 0;
    }
    cardEl[cardIndex].setAttribute("data-state", "hidden");
    cardEl[6].setAttribute("data-state", "display");
    result.textContent = "Your final score is: " + score;
}

function saveScore() {

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
        default:
            saveScore();
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