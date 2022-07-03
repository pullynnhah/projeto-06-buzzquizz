let quizzArray = [];
let question = [];
let levelsArray = [];

function renderCreateQuiz() {
  document.querySelector("main").innerHTML = ` 
    <div class="quizz-start">
      <h2>Comece pelo começo</h2>
      <div class="basic-informations">
        <input class="quizz-title" type="text" placeholder="Título do seu quizz">
        <p class="alert quizz-title hide">O título do quizz deve ter entre 20 a 65 caracteres</p>
        <input class="quizz-image" type="text" placeholder="URL da imagem do seu quizz">
        <p class="alert quizz-image hide">Valor informado não é uma URL válida</p>
        <input class="quizz-question-number" type="text" placeholder="Quantidade de perguntas do quizz">
        <p class="alert quizz-question-number hide">O quizz deve ter no mínimo 3 perguntas</p>
        <input class="quizz-levels-number" type="text" placeholder="Quantidades de níveis do quizz">
        <p class="alert quizz-levels-number hide">O quizz deve ter no mínimo 2 níveis</p>
      </div>
      <button onclick="getValuesQuizz()">Prosseguir para criar perguntas</button>
    </div>
  `;
  
  if (updateQuizz !== null) {
    fillCreateQuiz();
  }
}

function fillCreateQuiz() {
  const title = document.querySelector('.quizz-title');
  const image = document.querySelector('.quizz-image');
  const nQuestions = document.querySelector('.quizz-question-number');
  const nLevels = document.querySelector('.quizz-levels-number');
  
  title.value = updateQuizz.title;
  image.value = updateQuizz.image;
  nQuestions.value = updateQuizz.questions.length;
  nLevels.value = updateQuizz.levels.length;
}

function getValuesQuizz() {
  quizzArray = [];
  quizzArray.push({
    title: verifyQuizzTitle(document.querySelector(".quizz-title").value.trim()),
    image: verifyURL(document.querySelector(".quizz-image").value),
    questions: verifyQuestionNumber(Number(document.querySelector(".quizz-question-number").value)),
    levels: verifyLevelNumber(Number(document.querySelector(".quizz-levels-number").value)),
  });
  checkQuizzValues(quizzArray);
}

function hideAlerts() {
  let alertsShown = document.querySelectorAll(".alert");
  for (let i = 0; i < alertsShown.length; i++) {
    alertsShown[i].classList.add("hide");
  }
}

function checkQuizzValues(quizz) {
  hideAlerts();
  let verificationArray = [];
  if (quizz[0].title === false) {
    verificationArray.push(false);
    document.querySelector(".alert.quizz-title").classList.remove("hide");
  }
  if (quizz[0].image === false) {
    verificationArray.push(false);
    document.querySelector(".alert.quizz-image").classList.remove("hide");
  }
  if (quizz[0].questions === false) {
    verificationArray.push(false);
    document.querySelector(".alert.quizz-question-number").classList.remove("hide");
  }
  if (quizz[0].levels === false) {
    verificationArray.push(false);
    document.querySelector(".alert.quizz-levels-number").classList.remove("hide");
  }
  if (verificationArray.length === 0) {
    loadQuizzQuestions();
  }
}

function verifyQuizzTitle(titulo) {
  if (titulo.length < 20 || titulo.length > 65) {
    return false;
  }
  return titulo;
}

function verifyURL(url) {
  try {
    new URL(url);
    return url;
  } catch (e) {
    return false;
  }
}

function verifyQuestionNumber(questions) {
  if (questions < 3 || isNaN(questions)) {
    return false;
  }
  return questions;
}

function verifyLevelNumber(levels) {
  if (levels < 2 || isNaN(levels)) {
    return false;
  }
  return levels;
}

function loadQuizzQuestions() {
  document.querySelector("main").innerHTML = `    <div class="quizz-questions">
  <h2>Crie suas perguntas</h2>
  <div class="all-questions">
  </div>
  <button onclick="getValuesQuestions()"> Prosseguir para criar níveis</button>
</div>
  `;
  let createQuestions = document.querySelector(".all-questions");
  for (let i = 0; i < quizzArray[0].questions; i++) {
    createQuestions.innerHTML += `
      <div class="question number${i + 1} expand">
        <div>
          <h3>Pergunta ${i + 1}</h3>
          <ion-icon onclick="expand(this)" name="create-outline"></ion-icon>
        </div>
        <input class="question-title" type="text" placeholder="Texto da pergunta">
        <p class="alert question-title hide">O título da pergunta deve ter no mínimo 20 caracteres</p>
        <input class="question-color" type="text" placeholder="Cor de fundo da pergunta">
        <p class="alert question-color hide">A cor da pergunta deve ter o formato HEX</p>
        <h3>Resposta Correta</h3>
        <input class="answer0" type="text" placeholder="Resposta correta">
        <p class="alert answer0 hide">A resposta correta não pode ser vazia</p>
        <input class="answer0-image" type="text" placeholder="URL da imagem">
        <p class="alert answer0-image hide">Valor informado não é uma URL válida</p>
        <h3>Respostas incorretas</h3>
        <input class="answer1" type="text" placeholder="Resposta incorreta 1">
        <p class="alert answer1 hide">Deve haver pelo menos uma resposta errada</p>
        <input class="answer1-image" type="text" placeholder="URL da imagem 1">
        <p class="alert answer1-image hide">Valor informado não é uma URL válida</p>
        <input class="answer2" type="text" placeholder="Resposta incorreta 2">
        <p class="alert answer2 hide">A resposta não pode ser vazia</p>
        <input class="answer2-image" type="text" placeholder="URL da imagem 2">
        <p class="alert answer2-image hide">Valor informado não é uma URL válida</p>
        <input class="answer3" type="text" placeholder="Resposta incorreta 3">
        <p class="alert answer3 hide">A resposta não pode ser vazia</p>
        <input class="answer3-image" type="text" placeholder="URL da imagem 3">
        <p class="alert answer3-image hide">Valor informado não é uma URL válida</p>
      </div>`;
  }
  document.querySelector(".number1").classList.remove("expand");
  document.querySelector(".number1 ion-icon").classList.add("hide");
}

function fillQuizzQuestions() {
  const title = document.querySelector('.question-title');
  const color = document.querySelector('.question-color');
  const answer0 = document.querySelector('.answer0');
  const answer0Image = document.querySelector('.answer0-image');
  // TODO: needs fixing
  
  
  const index = updateQuizz.questions.answers.findIndex(answer => answer.isCorrectAnswer);
  answer0.value = updateQuizz.questions.answers[index].text;
  answer0Image.value = updateQuizz.questions.answers[index].image;
  
  const wrongAnswers = questions.answers.filter(answer => !answer.isCorrectAnswer);
  fori
  
}

function verifyHexColor(color) {
  if (/^#[\dA-Fa-f]{6}$/i.test(color)) {
    return color;
  }
  return false;
}

function expand(element) {
  document.querySelector("ion-icon.hide").classList.remove("hide");
  let expandAllQuestions = document.querySelectorAll(".question");
  for (let i = 0; i < expandAllQuestions.length; i++) {
    expandAllQuestions[i].classList.add("expand");
  }
  let expandAllLevels = document.querySelectorAll(".level");
  for (let i = 0; i < expandAllLevels.length; i++) {
    expandAllLevels[i].classList.add("expand");
  }
  let selectExpand = element.parentNode.parentNode;
  selectExpand.classList.remove("expand");
  element.classList.add("hide");
}

function verifyQuestionTitle(titulo) {
  if (titulo.length < 20 || titulo.length > 100) {
    return false;
  }
  return titulo;
}

function getValuesQuestions() {
  question = [];
  for (let i = 0; i < quizzArray[0].questions; i++) {
    question.push({
      title: verifyQuestionTitle(document.querySelector(`.number${i + 1} .question-title`).value),
      color: verifyHexColor(document.querySelector(`.number${i + 1} .question-color`).value),
      answers: [
        {
          text: document.querySelector(`.number${i + 1} .answer0`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .answer0-image`).value),
          isCorrectAnswer: true,
        },
        {
          text: document.querySelector(`.number${i + 1} .answer1`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .answer1-image`).value),
          isCorrectAnswer: false,
        },
      ],
    });
  }
  verifyQuestionAnswers(question);
  checkQuestionValues(question);
}

function verifyQuestionAnswers(question) {
  for (let i = 0; i < question.length; i++)
    if (
      (question[i].answers[1].text.trim() !== "" &&
        document.querySelector(`.number${i + 1} .answer2`).value.trim() !== "") ||
      document.querySelector(`.number${i + 1} .answer2-image`).value.trim() !== ""
    ) {
      question[i].answers.push({
        text: document.querySelector(`.number${i + 1} .answer2`).value,
        image: verifyURL(document.querySelector(`.number${i + 1} .answer2-image`).value),
        isCorrectAnswer: false,
      });
      if (
        (question[i].answers[2].text.trim() !== "" &&
          document.querySelector(`.number${i + 1} .answer3`).value.trim() !== "") ||
        document.querySelector(`.number${i + 1} .answer3-image`).value.trim() !== ""
      ) {
        question[i].answers.push({
          text: document.querySelector(`.number${i + 1} .answer3`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .answer3-image`).value),
          isCorrectAnswer: false,
        });
      }
    }
}

function checkQuestionValues(question) {
  hideAlerts();
  let verificationArray = [];
  for (let i = 0; i < question.length; i++) {
    if (question[i].title === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.question-title`).classList.remove("hide");
    }
    if (question[i].color === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.question-color`).classList.remove("hide");
    }
    for (let j = 0; j < question[i].answers.length; j++) {
      if (question[i].answers[j].text.trim() === "") {
        verificationArray.push(false);
        document.querySelector(`.number${i + 1} .alert.answer${j}`).classList.remove("hide");
      }
      if (question[i].answers[j].image === false) {
        verificationArray.push(false);
        document.querySelector(`.number${i + 1} .alert.answer${j}-image`).classList.remove("hide");
      }
    }
  }
  if (verificationArray.length === 0) {
    loadQuizzLevels();
  }
}

function loadQuizzLevels() {
  document.querySelector("main").innerHTML = `
  <div class="quizz-levels">
  <h2>Agora, decida os níveis!</h2>
  <div class="all-levels">
  </div>
  <button onclick="getValuesLevels()"> Finalizar Quizz</button>
</div>
  `;
  let createLevels = document.querySelector(".all-levels");
  for (let i = 0; i < quizzArray[0].levels; i++) {
    createLevels.innerHTML += `
    <div class="level number${i + 1} expand">
    <div>
      <h3>Nível ${i + 1}</h3>
      <ion-icon onclick="expand(this)" name="create-outline"></ion-icon>
    </div>
    <input class="level-title" type="text" placeholder="Título do Nível">
    <p class="alert level-title hide">O título do nível deve ter no mínimo 10 caracteres</p>
    <input class="level-percentage" type="text" placeholder="% de acerto mínima">
    <p class="alert level-percentage hide">O valor do nível deve ser um número entre 0 e 100</p>
    <p class="alert level-percentage-no-zero hide">Deve haver pelo menos um valor zero</p>
    <p class="alert level-percentage-repeat hide">Não pode haver mais de um valor igual</p>
    <input class="level-image" type="text" placeholder="URL da imagem do nível">
    <p class="alert level-image hide">Valor informado não é uma URL válida</p>
    <input class="level-text" type="text" placeholder="Descrição do nível">
    <p class="alert level-text hide">A descrição do nível deve ter no mínimo 30 caracteres</p>
  </div>
`;
  }
  document.querySelector(".number1").classList.remove("expand");
  document.querySelector(".number1 ion-icon").classList.add("hide");
}

function verifyLevelTitle(titulo) {
  if (titulo.length < 10 || titulo.length > 65) {
    return false;
  }
  return titulo;
}

function verifyLevelText(text) {
  if (text.length < 30 || text.length > 1000) {
    return false;
  }
  return text;
}

function verifyLevelPercentage(percentage) {
  if (percentage === "") {
    return false;
  }

  const number = Number(percentage);
  if (isNaN(number) || number < 0 || number > 100) {
    return false;
  }

  return number;
}

function getValuesLevels() {
  levelsArray = [];
  for (let i = 0; i < quizzArray[0].levels; i++) {
    levelsArray.push({
      title: verifyLevelTitle(document.querySelector(`.number${i + 1} .level-title`).value.trim()),
      image: verifyURL(document.querySelector(`.number${i + 1} .level-image`).value),
      text: verifyLevelText(document.querySelector(`.number${i + 1} .level-text`).value.trim()),
      minValue: verifyLevelPercentage(
        document.querySelector(`.number${i + 1} .level-percentage`).value.trim()
      ),
    });
  }
  checkLevelsValues(levelsArray);
}

function checkLevelsValues(levels) {
  hideAlerts();
  let verificationArray = [];
  let verificationLevelArray = [];
  let verificationLevelZero = [];
  for (let i = 0; i < levels.length; i++) {
    if (levels[i].title === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-title`).classList.remove("hide");
    }
    if (levels[i].image === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-image`).classList.remove("hide");
    }
    if (levels[i].text === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-text`).classList.remove("hide");
    }
    if (levels[i].minValue === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-percentage`).classList.remove("hide");
    }
  }
  for (let i = 0; i < levels.length; i++) {
    for (let j = i + 1; j < levels.length; j++)
      if (levels[i].minValue === levels[j].minValue) {
        verificationLevelArray.push(false);
        document.querySelector(`.number${i + 1} .level-percentage-repeat`).classList.remove("hide");
        document.querySelector(`.number${j + 1} .level-percentage-repeat`).classList.remove("hide");
      }
    if (levels[i].minValue === 0) {
      verificationLevelZero.push(true);
    }
  }
  if (verificationLevelZero.length === 0) {
    document.querySelector(".level-percentage-no-zero").classList.remove("hide");
  } else if (verificationLevelZero.length > 1) {
    alert("Tem mais de um nível com porcentagem 0");
  } else if (verificationLevelZero.length === 1) {
    if (verificationArray.length === 0 && verificationLevelArray.length === 0) {
      getQuizzDone();
    }
  }
}

let userQuiz;

function getQuizzDone() {
  userQuiz = {
    title: quizzArray[0].title,
    image: quizzArray[0].image,
    questions: question,
    levels: levelsArray,
  };
  saveQuizz();
}

function saveQuizz() {
  renderLoading();
  const promise = axios.post(`${URI}/quizzes`, userQuiz);
  promise.then(response => {
    const quiz = response.data;
    dump(quiz.id, quiz.key);
    renderSucessPage(quiz.image, quiz.title, quiz.id);
  });
}

function renderSucessPage(image, title, id) {
  main.innerHTML = `
    <div class="quizz-sucess">
      <h2>Seu quizz está pronto!</h2>
      <div class="gradient">
        <div class="image">
          <img src="${image}" />
          <div class="overlay"></div>    
        </div>
        <p>${title}</p>
      </div>
      <div class="sucess-btns">
        <div class="sucess-btn red-btn" onclick="playQuiz(${id})">Acessar Quizz</div>
        <div class="sucess-btn white-btn" onclick="getQuizzes()">Voltar pra home</div>
      </div>
    </div>
  `;
}

// renderCreateQuiz();
//saveQuizz();
