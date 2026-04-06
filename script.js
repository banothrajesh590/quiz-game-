const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Kolkata", correct: false },
      { text: "Chennai", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "Who invented JavaScript?",
    answers: [
      { text: "Brendan Eich", correct: true },
      { text: "Bill Gates", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Mark Zuckerberg", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.remove("hide");
  resultContainer.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(correct) {
  if (correct) score++;

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("question-container").classList.add("hide");
  resultContainer.classList.remove("hide");
  resultText.textContent = 'You scored ${score} out of ${questions.length}';
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
