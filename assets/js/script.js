//select elements
const timeEl = document.getElementById("time");
const cardEl = document.querySelectorAll(".card");
const nextBtn = document.querySelectorAll(".next-btn");
const showAnswer = document.getElementById("answer");
const result = document.getElementById("result");
const highScore = localStorage.getItem("score");

let secLeft = 75;
let score = 0;
let cardIndex = 0;

