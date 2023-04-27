//select elements
const timeEl = document.getElementById("time");
const cardEl = document.querySelectorAll(".card");
const nextBtn = document.querySelectorAll(".next-btn");
const showAnswer = document.getElementById("answer");
const result = document.getElementById("result");
const highScore = localStorage.getItem("score");
const returnBtn = getElementById("return-btn");
const clearBtn = getElementById("clear-btn");

let secLeft = 75;
let score = 0;
let cardIndex = 0;

//event listeners
nextBtn.forEach(function(btn) {
    btn.addEventListener("click", next);
});

returnBtn.addEventListener("click", function() {
    document.reload();
})

clearBtn.addEventListener("click", clearScore);