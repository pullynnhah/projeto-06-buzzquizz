function userQuizzesHTML(quizArray) {
  let html;
  if (quizArray.length === 0) {
    html = `
      <div class="user-quiz-box">
        <p>Você não criou nenhum<br>quizz ainda :(</p>
        <button onclick="renderCreateQuiz()">Criar Quizz</button>
      </div>
    `;
  } else {
    html = `
      <div class="quiz-list">
        <div class="quiz-header">
          <h2>Seus Quizzes</h2>
          <ion-icon onclick="renderCreateQuiz()" name="add-circle"></ion-icon>
        </div>
        ${quizzesHTML(quizArray)}
      </div>
    `;
  }

  return `<div class="user-quiz">${html}</div>`;
}

function generalQuizzesHTML(quizArray) {
  return `
    <div class="quiz-list">
      <div class="quiz-header">
        <h2>Todos os Quizzes</h2>
      </div>
      ${quizzesHTML(quizArray)}
    </div>
  `;
}

function quizzesHTML(quizArray) {
  const reducedHTML = quizArray.reduce((ac, quiz) => {
    const html = `
      <div class="gradient" onclick="playQuiz(${quiz.id})">
        <div class="image">
          <img src="${quiz.image}" />
          <div class="overlay"></div>    
        </div>
        <p>${quiz.title}</p>
      </div>
    `;
    return ac + html;
  }, "");

  return `<div class="quiz-container">${reducedHTML}</div>`;
}

function renderQuizzes(quizArray) {
  const data = load();
  const idUserQuizzes = Object.keys(data).map(key => Number(key));
  const generalQuizzes = quizArray.filter(quiz => !idUserQuizzes.includes(quiz.id));
  const userQuizzes = quizArray.filter(quiz => idUserQuizzes.includes(quiz.id));

  main.innerHTML = `
    <div class="list">
      ${userQuizzesHTML(userQuizzes)}
      ${generalQuizzesHTML(generalQuizzes)}
    </div>
  `;
}

function getQuizzes() {
  renderLoading();
  const promise = axios.get(`${URI}/quizzes`);
  promise.then(response => renderQuizzes(response.data));
}

getQuizzes();
