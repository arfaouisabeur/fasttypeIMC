// Array Of Words
const words = [
  "Imc Talk",
  "Code",
  "Town",
  "Algorithm",
  "Innovation",
  "Disruption",
  "Prototype",
  "Agile",
  "Iteration",
  "Canvas",
  "Value Proposition",
  "Customer Segments",
  "Cost Structure",
  "Revenue Streams",
  "Pivot",
  "Mindfulness",
  "Breathing",
  "Relaxation",
  "Meditation",
  "Exercise",
  "Automation",
  "Blockchain",
  "SaaS",
  "Cloud Computing",
  "Business Model",
  "Lean Startup",
  "Stress Relief"
];

// Setting Levels
const lvls = {
  "Easy": 7,
  "Normal": 10,
  "Hard": 3
};

// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let submitButton = document.querySelector(".submit");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
}

// Start Game
startButton.onclick = function () {
  this.remove();
  submitButton.style.display = "block";
  input.focus();
  // Generate Word Function
  genWords();
}

// Submit Word
submitButton.onclick = function () {
  if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
    // Empty Input Field
    input.value = '';
    // Increase Score
    scoreGot.innerHTML++;
    if (words.length === 0) {
      let span = document.createElement("span");
      span.className = 'good';
      let spanText = document.createTextNode("Congratulations! You've completed the game the number of this round is 321");
      span.appendChild(spanText);
      finishMessage.innerHTML = ''; // Clear existing messages
      finishMessage.appendChild(span);
      // Remove Upcoming Words Box
      upcomingWords.remove();
      endGame(); // Stop the timer
    } else {
      // Call Generate Word Function
      genWords();
    }
  } else {
    let span = document.createElement("span");
    span.className = 'bad';
    let spanText = document.createTextNode("Game Over");
    span.appendChild(spanText);
    finishMessage.innerHTML = ''; // Clear existing messages
    finishMessage.appendChild(span);
    // Disable input field
    input.disabled = true;
    // Remove submit button
    submitButton.style.display = "none";
    endGame(); // Stop the timer
  }
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

// Declare start variable outside any function scope
let start;

function startPlay() {
  clearInterval(start); // Clear any existing interval

  let remainingTime = defaultLevelSeconds;
  timeLeftSpan.innerHTML = remainingTime;
  start = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      // Stop Timer
      clearInterval(start);
      // Display "Game Over" message
      let span = document.createElement("span");
      span.className = 'bad';
      let spanText = document.createTextNode("Game Over");
      span.appendChild(spanText);
      finishMessage.innerHTML = ''; // Clear existing messages
      finishMessage.appendChild(span);
      // Disable input field
      input.disabled = true;
      // Remove submit button
      submitButton.style.display = "none";
      endGame(); // Stop the timer
    } else {
      timeLeftSpan.innerHTML = remainingTime;
    }
  }, 1000);
}

// Call clearInterval on start at the end of the game
function endGame() {
  clearInterval(start);
}
