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
        ${quizzesHTML(quizArray, true)}
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

function quizzesHTML(quizArray, isYours = true) {
  const reducedHTML = quizArray.reduce((ac, quiz) => {
    let div = "";
    if (isYours) {
      div = `
      <div class="modify">
        <ion-icon onclick="edit(${quiz.id})" name="create-outline"></ion-icon>
        <ion-icon onclick="del(${quiz.id})" name="trash-outline"></ion-icon>
      </div>`;
    }
    const html = `
      <div class="gradient">
        <div class="image">
          <img src="${quiz.image}" />
          <div class="overlay" onclick="playQuiz(${quiz.id})"></div>  
          ${div}  
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

function edit(id) {
  renderLoading();
  const promise = axios.get(`${URI}/quizzes/${id}`);
  promise.then(response => {
    updateQuizz = response.data;
    renderCreateQuiz();
  });
}

function del(id) {
  if (confirm("Deseja excluir esse quizz?")) {
    const data = load();
    const key = data[id];
    if (key !== undefined) {
      renderLoading();
      const promise = axios.delete(`${URI}/quizzes/${id}`, {headers: {"Secret-Key": key}});
    } else {
      alert("Esse quizz não pertence a você!");
    }
  }
}

let updateQuizz = null;
getQuizzes();
