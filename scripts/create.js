function renderCreateQuiz() {
  document.querySelector("main").innerHTML = ` 
    <div class="quizz-start">
      <h2>Comece pelo começo</h2>
      <div class="basic-informations">
        <input class="quizz-title" type="text" placeholder="Título do seu quizz">
        <p class="alert quizz-title hide">Seu título deve ter entre 20 a 65 caracteres</p>
        <input class="quizz-image" type="text" placeholder="URL da imagem do seu quizz">
        <p class="alert quizz-image hide">Deve ser um URL válido</p>
        <input class="quizz-question-number" type="text" placeholder="Quantidade de perguntas do quizz">
        <p class="alert quizz-question-number hide">Deve haver no mínimo 3 perguntas</p>
        <input class="quizz-levels-number" type="text" placeholder="Quantidades de níveis do quizz">
        <p class="alert quizz-levels-number hide">Deve haver no mínimo 2 níveis</p>
      </div>
      <button onclick="getValues()">Prosseguir para criar perguntas</button>
    </div>
  `;
}

function clearValues() {
  document.querySelector(".quizz-title").value = "";
  document.querySelector(".quizz-image").value = "";
  document.querySelector(".quizz-question-number").value = "";
  document.querySelector(".quizz-levels-number").value = "";
}

function getValues() {
  quizzTitle = document.querySelector(".quizz-title").value;
  quizzImage = document.querySelector(".quizz-image").value;
  quizzQuestionNumber = document.querySelector(".quizz-question-number").value;
  quizzLevelNumber = document.querySelector(".quizz-levels-number").value;
  let titleOk = verifyQuizzTitle();
  let questionNumberOk = verifyQuestionNumber();
  let LevelNumberOk = verifyLevelNumber();
  if (titleOk && questionNumberOk && LevelNumberOk) {
    alert("tudo certo, vamos lá");
    loadQuizzQuestions();
  } else {
    alert("rever dados");
  }
}

function verifyQuizzTitle() {
  let titleLength = quizzTitle.length;
  if (titleLength < 20 || titleLength > 65) {
    alert("titulo errado");
    return false;
  }
  return true;
}

function verifyQuestionNumber() {
  if (quizzQuestionNumber < 3) {
    alert("Questões menor que 3");
    return false;
  }
  return true;
}

function verifyLevelNumber() {
  if (quizzLevelNumber < 2) {
    alert("Menos que 2 níveis");
    return false;
  }
  return true;
}

function loadQuizzQuestions() {
  document.querySelector('main').innerHTML = `    <div class="quizz-questions">
  <h2>Crie suas perguntas</h2>
  <div class="all-questions">
  </div>
  <button> Prosseguir para criar níveis</button>
</div>
  `
  let createQuestions = document.querySelector('.all-questions')
  for (let i = 0; i < quizzQuestionNumber; i++) {
    createQuestions.innerHTML += `        <div class="question">
    <h3>Pergunta ${(i + 1)}</h3>
    <input class="question-title" type="text" placeholder="Texto da pergunta">
    <input class="question-color" type="text" placeholder="Cor de fundo da pergunta">
    <h3>Resposta Correta</h3>
    <input class="correct-answer" type="text" placeholder="Resposta correta">
    <input class="correct-answer-image" type="text" placeholder="URL da imagem">
    <h3>Respostas incorretas</h3>
    <input class="wrong-answer" type="text" placeholder="Resposta incorreta 1">
    <input class="wrong-answer-image" type="text" placeholder="URL da imagem 1">
    <input class="wrong-answer" type="text" placeholder="Resposta incorreta 2">
    <input class="wrong-answer-image" type="text" placeholder="URL da imagem 2">
    <input class="wrong-answer" type="text" placeholder="Resposta incorreta 3">
    <input class="wrong-answer-image" type="text" placeholder="URL da imagem 3">
  </div>`
  }
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

let quizzTitle = null;
let quizzImage = null;
let quizzQuestionNumber = null;
let quizzLevelNumber = null;

// TODO: deletar o conteúdo da variável abaixo quando possível
let userQuiz = {
  title: "Título do quizz",
  image: "https://http.cat/411.jpg",
  questions: [
    {
      title: "Título da pergunta 1",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 2",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
    {
      title: "Título da pergunta 3",
      color: "#123456",
      answers: [
        {
          text: "Texto da resposta 1",
          image: "https://http.cat/411.jpg",
          isCorrectAnswer: true,
        },
        {
          text: "Texto da resposta 2",
          image: "https://http.cat/412.jpg",
          isCorrectAnswer: false,
        },
      ],
    },
  ],
  levels: [
    {
      title: "Título do nível 1",
      image: "https://http.cat/411.jpg",
      text: "Descrição do nível 1",
      minValue: 0,
    },
    {
      title: "Título do nível 2",
      image: "https://http.cat/412.jpg",
      text: "Descrição do nível 2",
      minValue: 50,
    },
  ],
};
// renderCreateQuiz();
saveQuizz();