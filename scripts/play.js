function playQuiz(id) {
  renderLoading();
  const promise = axios.get(`${URI}/quizzes/${id}`);
  promise.then(response => {
    renderQuiz(response.data);
  });
}

function renderQuiz(quiz) {
  main.innerHTML = `
    <div class="play-container">
      <div class="play-header">
        <img src="${quiz.image}" />
        <h2>${quiz.title}</h2>
        <div class="overlay"></div>
      </div>
      <div class="questions-container"></div>
    </div>
  `;

  questionsContainer = document.querySelector(".questions-container");
  quizScore = 0;
  quizAnswerCount = 0;
  quizSize = quiz.questions.length;
  levels = quiz.levels;
  currentQuizId = quiz.id;
  renderQuestions(quiz.questions);
  quests = document.querySelectorAll(".quiz");
  playContainer = document.querySelector(".play-container");
}

function renderQuestions(questions) {
  questionsContainer.innerHTML = "";
  return questions.forEach(question => {
    questionsContainer.innerHTML += `
      <article class="quiz open">
        <div class="question-header">
          <h3>${question.title}</h3>
        </div>
        <div class="answers-container">
          ${answersHTML(question.answers)}
        </div>
      </article>
    `;
    const quest = questionsContainer.querySelector(".quiz:last-child .question-header");
    quest.style.backgroundColor = question.color;
  });
}

function answersHTML(answers) {
  answers.sort(() => Math.random() - 0.5);
  return answers.reduce((ac, answer) => {
    const cls = answer.isCorrectAnswer ? "answer correct" : "answer";
    const html = `
      <div class="${cls}" onclick="selectAnswer(this)">
        <img src="${answer.image}" />
        <p>${answer.text}</p>
      </div>
    `;
    return ac + html;
  }, "");
}

function selectAnswer(element) {
  const parent = element.parentNode.parentNode;
  if (parent.classList.contains("open")) {
    parent.classList.remove("open");
    element.classList.add("chosen");
    if (element.classList.contains("correct")) {
      quizScore++;
    }

    if (++quizAnswerCount < quizSize) {
      console.log(quizAnswerCount);
      setTimeout(() => quests[quizAnswerCount - 1].scrollIntoView(), 2000);
    } else {
      setTimeout(renderScore, 2000);
    }
  }
}

function renderScore() {
  console.log("hey");
  const finalScore = getScore();
  const finalLevel = getLevel(finalScore);
  playContainer.innerHTML += `
    <div class="quiz-result">
    <div class="background-result">
      <div class="quiz-result-header">
        <h2>${finalScore}% de acerto: ${finalLevel.title}</h2>
      </div>
      <div class="result">
        <img src="${finalLevel.image}" />
        <p>${finalLevel.text}</p>
      </div>
    </div>

      <div class="play-btns">
        <div class="play-btn red-btn" onclick="playQuiz(${currentQuizId})">Reiniciar Quizz</div>
        <div class="play-btn white-btn" onclick="getQuizzes()">Voltar pra home</div>
        
      </div>
    </div>
  `;

  const quizResult = document.querySelector(".quiz-result");
  quizResult.scrollIntoView();
}

function getScore() {
  console.log(Math.round((quizScore * 100) / quizSize))
  return Math.round((quizScore * 100) / quizSize);
}

function getLevel(score) {
  levels.sort((a, b) => b.minValue - a.minValue);
  let level;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (score < levels) {
      return level;
    }

    level = levels[i];
  }

  return level;
}

let questionsContainer = null;
let playContainer = null;
let quizScore = null;
let quizAnswerCount = null;
let currentQuizId = null;
let quizSize = null;
let quests = null;
let levels = null;

