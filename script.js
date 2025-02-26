// Array of random sentences
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "JavaScript is a versatile language used for web development.",
  "Practice makes perfect when it comes to improving typing speed.",
  "Coding is fun and challenging at the same time.",
  "The early bird catches the worm, but the second mouse gets the cheese.",
  "Learning new skills is essential for personal growth.",
  "Technology has revolutionized the way we live and work.",
  "Creativity is intelligence having fun.",
  "Success is the sum of small efforts repeated day in and day out.",
];

// DOM elements
const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const resultsElement = document.getElementById("results");
const changeSentenceButton = document.getElementById("change-sentence");

let startTime;

// Function to start the test
function startTest() {
  // Pick a random sentence
  const randomSentence =
    sentences[Math.floor(Math.random() * sentences.length)];
  sentenceElement.textContent = randomSentence;

  // Clear input field and reset styles
  inputElement.value = "";
  inputElement.classList.remove("correct", "incorrect");
  inputElement.style.backgroundColor = "#fff";

  // Focus on the input field
  inputElement.focus();

  // Record the start time
  startTime = new Date();
}

// Function to update results when the sentence is completed
function updateResults() {
  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000; // Time in seconds

  const typedText = inputElement.value.trim();
  const words = typedText.split(" ").filter((word) => word !== "").length; // Count non-empty words
  const keystrokes = typedText.length;

  // Calculate WPM and KPM
  const wpm = Math.round((words / timeTaken) * 60);
  const kpm = Math.round((keystrokes / timeTaken) * 60);

  // Display results
  resultsElement.innerHTML = `
    <p><i class="fas fa-clock me-2"></i>Time Taken: ${timeTaken.toFixed(
      2
    )} seconds</p>
    <p><i class="fas fa-pencil-alt me-2"></i>Words Typed: ${words}</p>
    <p><i class="fas fa-keyboard me-2"></i>Keystrokes: ${keystrokes}</p>
    <p><i class="fas fa-tachometer-alt me-2"></i>Speed: ${wpm} WPM / ${kpm} KPM</p>
    <p>${
      wpm >= 65
        ? "🎉 Great job! You met the goal."
        : "🚀 Keep practicing to reach 65-70 WPM!"
    }</p>
  `;
}

// Function to check if the sentence is typed completely and correctly
function checkSentenceCompletion() {
  const typedText = inputElement.value.trim();
  const currentSentence = sentenceElement.textContent.trim();

  if (typedText === currentSentence) {
    inputElement.classList.add("correct");
    inputElement.classList.remove("incorrect");
    updateResults(); // Update results
    setTimeout(startTest, 1000); // Start a new test after 1 second
  } else if (typedText.length > 0) {
    inputElement.classList.add("incorrect");
    inputElement.classList.remove("correct");
  } else {
    inputElement.classList.remove("correct", "incorrect");
  }
}

// Start the test when the page loads
startTest();

// Check for sentence completion and update styles on input
inputElement.addEventListener("input", () => {
  checkSentenceCompletion();
});

// Restart the test when the user clicks on the input field
inputElement.addEventListener("click", startTest);

// Change sentence when the button is clicked
changeSentenceButton.addEventListener("click", () => {
  startTest(); // Start a new test with a new sentence
});
