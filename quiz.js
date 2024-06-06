const quizData = [
    {
      question: "Who is the founder of Microsoft?",
      choices: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"],
      correct: 0
    },
    {
      question: "What is the primary function of a balance sheet?",
      choices: ["Record expenses", "Measure profitability", "Track assets and liabilities", "Forecast future revenues"],
      correct: 2
    },
    {
      question: "Which of the following is not a type of market structure?",
      choices: ["Monopoly", "Oligopoly", "Competition", "Monopsony"],
      correct: 3
    },
    {
      question: "What does ROI stand for in business?",
      choices: ["Return on Investment", "Revenue of Income", "Rate of Interest", "Risk of Inflation"],
      correct: 0
    },
    {
      question: "Who is the CEO of Tesla?",
      choices: ["Jeff Bezos", "Elon Musk", "Tim Cook", "Satya Nadella"],
      correct: 1
    },
    {
      question: "What is the currency of Japan?",
      choices: ["Yuan", "Euro", "Pound", "Yen"],
      correct: 3
    },
    {
      question: "Which company owns YouTube?",
      choices: ["Facebook", "Google", "Microsoft", "Amazon"],
      correct: 1
    },
    {
      question: "What does IPO stand for?",
      choices: ["Initial Product Offering", "Initial Public Offering", "Internet Protocol Organization", "Inter-Party Organization"],
      correct: 1
    },
    {
      question: "Which of the following is a measure of a company's profitability?",
      choices: ["GDP", "EPS", "CPI", "ROI"],
      correct: 1
    },
    {
      question: "Who is the founder of Amazon?",
      choices: ["Bill Gates", "Elon Musk", "Mark Zuckerberg", "Jeff Bezos"],
      correct: 3
    },
    {
      question: "Which country is known as the world's largest producer of oil?",
      choices: ["USA", "Russia", "Saudi Arabia", "China"],
      correct: 2
    },
    {
      question: "What is the process of converting raw materials into finished goods called?",
      choices: ["Manufacturing", "Distribution", "Marketing", "Sales"],
      correct: 0
    },
    {
      question: "What is the Dow Jones Industrial Average?",
      choices: ["A stock market index", "A bank's interest rate", "A consumer confidence survey", "A manufacturing index"],
      correct: 0
    },
    {
      question: "What is the economic term for the total value of goods and services produced within a country's borders in a specific time period?",
      choices: ["GDP", "CPI", "PPP", "GNP"],
      correct: 0
    },
    {
      question: "What is the concept of 'supply and demand' in economics?",
      choices: ["The relationship between price and quantity", "The relationship between consumers and producers", "The relationship between imports and exports", "The relationship between taxes and spending"],
      correct: 0
    }
  ];
  
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitBtn = document.getElementById("submitBtn");
  const feedbackElement = document.getElementById("feedback");
  const chartCanvas = document.getElementById("chart");
  const reportElement = document.getElementById("report");
  
  let currentQuestion = 0;
  let score = 0;
  let answered = false;
  
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    choicesElement.innerHTML = "";
    // Randomize answer choices
    const shuffledChoices = currentQuizData.choices.slice().sort(() => Math.random() - 0.5);
    shuffledChoices.forEach((choice, index) => {
      const choiceElement = document.createElement("button");
      choiceElement.innerText = choice;
      choiceElement.classList.add("choice");
      choiceElement.addEventListener("click", () => checkAnswer(currentQuizData.choices.indexOf(choice)));
      choicesElement.appendChild(choiceElement);
    });
  }
  
  
  function checkAnswer(choice) {
    if (!answered) {
      answered = true;
      const currentQuizData = quizData[currentQuestion];
      const selectedChoice = choicesElement.childNodes[choice];
      if (choice === currentQuizData.correct) {
        selectedChoice.classList.add("correct");
        feedbackElement.innerText = "Correct!";
        score++;
      } else {
        selectedChoice.classList.add("wrong");
        feedbackElement.innerText = `Wrong! The correct answer is: ${currentQuizData.choices[currentQuizData.correct]}`;
      }
      submitBtn.innerText = "Next";
    }
  }
  
  function nextQuestion() {
    if (answered) {
      currentQuestion++;
      if (currentQuestion < quizData.length - 1) {
        loadQuestion();
        feedbackElement.innerText = "";
        submitBtn.innerText = "Submit";
        choicesElement.childNodes.forEach(choice => {
          choice.classList.remove("correct", "wrong");
        });
        answered = false;
      } else {
        endQuiz();
      }
    }
  }
  
  function endQuiz() {
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    submitBtn.style.display = "none";
    chartCanvas.style.display = "block";
    generateChart();
  }
  
  function generateChart() {
    const ctx = chartCanvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [{
          data: [score, quizData.length - score],
          backgroundColor: ["#70db70", "#ff7f7f"],
          borderColor: "#fff",
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: "bottom"
          },
          title: {
            display: true,
            text: "Quiz Results"
          }
        }
      }
    });
  }
  
  loadQuestion();
  submitBtn.addEventListener("click", nextQuestion);
  