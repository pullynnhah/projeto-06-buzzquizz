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
}

function clearValues() {
  document.querySelector(".quizz-title").value = "";
  document.querySelector(".quizz-image").value = "";
  document.querySelector(".quizz-question-number").value = "";
  document.querySelector(".quizz-levels-number").value = "";
}


function getValuesQuizz() {
  quizzArray = [];
  quizzArray.push(
    {
      title: verifyQuizzTitle(document.querySelector('.quizz-title').value.trim()),
      image: verifyURL(document.querySelector('.quizz-image').value),
      questions: verifyQuestionNumber(Number(document.querySelector('.quizz-question-number').value)),
      levels: verifyLevelNumber(Number(document.querySelector('.quizz-levels-number').value)),
    }
  )
  checkQuizzValues(quizzArray);
}

function hideAlerts() {
  let alertsShown = document.querySelectorAll('.alert');
  for (let i = 0; i < alertsShown.length; i++) {
    alertsShown[i].classList.add('hide');
  }
}

function checkQuizzValues(quizz) {
  hideAlerts();
  let verificationArray = [];
  if (quizz[0].title === false) {
    verificationArray.push(false);
    document.querySelector('.alert.quizz-title').classList.remove('hide');
  }
  if (quizz[0].image === false) {
    verificationArray.push(false);
    document.querySelector('.alert.quizz-image').classList.remove('hide');
  }
  if (quizz[0].questions === false) {
    verificationArray.push(false);
    document.querySelector('.alert.quizz-question-number').classList.remove('hide');
  }
  if (quizz[0].levels === false) {
    verificationArray.push(false);
    document.querySelector('.alert.quizz-levels-number').classList.remove('hide');
  }
  if (verificationArray.length === 0) {
    alert('tudo OK nos valores iniciais')
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
  document.querySelector('main').innerHTML = `    <div class="quizz-questions">
  <h2>Crie suas perguntas</h2>
  <div class="all-questions">
  </div>
  <button onclick="getValuesQuestions()"> Prosseguir para criar níveis</button>
</div>
  `
  let createQuestions = document.querySelector('.all-questions')
  for (let i = 0; i < quizzArray[0].questions; i++) {
    createQuestions.innerHTML += `        <div class="question number${(i + 1)}">
    <div>
    <h3>Pergunta ${(i + 1)}</h3>
    <ion-icon onclick="expand(this)" name="create-outline"></ion-icon>
    </div>
    <input class="question-title" type="text" placeholder="Texto da pergunta">
    <p class="alert question-title hide">O título da pergunta deve ter no mínimo 20 caracteres</p>
    <input class="question-color" type="text" placeholder="Cor de fundo da pergunta">
    <p class="alert question-color hide">A cor da pergunta deve ter o formato HEX</p>
    <h3>Resposta Correta</h3>
    <input class="correct-answer" type="text" placeholder="Resposta correta">
    <p class="alert correct-answer hide">A resposta correta não pode ser vazia</p>
    <input class="correct-answer-image" type="text" placeholder="URL da imagem">
    <p class="alert correct-answer-image hide">Valor informado não é uma URL válida</p>
    <h3>Respostas incorretas</h3>
    <input class="wrong-answer1" type="text" placeholder="Resposta incorreta 1">
    <p class="alert wrong-answer1 hide">Deve haver pelo menos uma resposta errada</p>
    <input class="wrong-answer1-image" type="text" placeholder="URL da imagem 1">
    <p class="alert wrong-answer1-image hide">Valor informado não é uma URL válida</p>
    <input class="wrong-answer2" type="text" placeholder="Resposta incorreta 2">
    <input class="wrong-answer2-image" type="text" placeholder="URL da imagem 2">
    <p class="alert cwrong-answer2-image hide">Valor informado não é uma URL válida</p>
    <input class="wrong-answer3" type="text" placeholder="Resposta incorreta 3">
    <input class="wrong-answer3-image" type="text" placeholder="URL da imagem 3">
    <p class="alert wrong-answer3-image hide">Valor informado não é uma URL válida</p>
  </div>`
  }
}

function verifyHexColor(color) {
  if (/^#[0-9A-F]{6}$/i.test(color)) {
    return color;
  }
  return false;
}

function expand(element) {
  let selectExpand = element.parentNode.parentNode;
  selectExpand.classList.add('expand')
  console.log("rodei")

}

function verifyQuestionTitle(titulo) {
  if (titulo.length < 20 || titulo.length > 65) {
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
          text: document.querySelector(`.number${i + 1} .correct-answer`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .correct-answer-image`).value),
          isCorrectAnswer: true,
        },
        {
          text: document.querySelector(`.number${i + 1} .wrong-answer1`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .wrong-answer1-image`).value),
          isCorrectAnswer: false,
        },
        {
          text: document.querySelector(`.number${i + 1} .wrong-answer2`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .wrong-answer2-image`).value),
          isCorrectAnswer: false,
        },
        {
          text: document.querySelector(`.number${i + 1} .wrong-answer3`).value,
          image: verifyURL(document.querySelector(`.number${i + 1} .wrong-answer3-image`).value),
          isCorrectAnswer: false,
        },
      ]
    })
  }
  checkQuestionValues(question)
}

function checkQuestionValues(question) {
  hideAlerts()
  let verificationArray = [];
  for (let i = 0; i < question.length; i++) {
    if (question[i].title === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.question-title`).classList.remove('hide');
    }
    if (question[i].color === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.question-color`).classList.remove('hide');
    }
    if (question[i].answers[0].text.trim() === '') {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.correct-answer`).classList.remove('hide');
    }
    if (question[i].answers[0].image === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.correct-answer-image`).classList.remove('hide');
    }
    if (question[i].answers[1].text.trim() === '') {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.wrong-answer1`).classList.remove('hide');
    }
    if (question[i].answers[1].image === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.wrong-answer1-image`).classList.remove('hide');
    }
  }
  if (verificationArray.length === 0) {
    alert('tudo OK nas perguntas')
    loadQuizzLevels();
  } else {
    alert('dados com problema nas perguntas')
  }
}


//loadQuizzQuestions();
//loadQuizzLevels();

function loadQuizzLevels() {
  document.querySelector('main').innerHTML = `
  <div class="quizz-levels">
  <h2>Agora, decida os níveis!</h2>
  <div class="all-levels">
  </div>
  <button onclick="getValuesLevels()"> Finalizar Quizz</button>
</div>
  `
  let createLevels = document.querySelector('.all-levels')
  for (let i = 0; i < quizzArray[0].levels; i++) {
    createLevels.innerHTML += `
    <div class="level number${(i + 1)}">
    <div>
      <h3>Nível ${(i + 1)}</h3>
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
`
  }
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
  if (percentage !== NaN && percentage >= 0 && percentage <= 100) {
    return percentage;
  }
  return false;
}

function getValuesLevels() {
  levelsArray = [];
  for (let i = 0; i < quizzArray[0].levels; i++) {
    levelsArray.push(
      {
        title: verifyLevelTitle(document.querySelector(`.number${i + 1} .level-title`).value.trim()),
        image: verifyURL(document.querySelector(`.number${i + 1} .level-image`).value),
        text: verifyLevelText(document.querySelector(`.number${i + 1} .level-text`).value.trim()),
        minValue: verifyLevelPercentage(Number(document.querySelector(`.number${i + 1} .level-percentage`).value)),
      }
    )
  }
  checkLevelsValues(levelsArray)
}

function checkLevelsValues(levels) {
  hideAlerts();
  let verificationArray = [];
  let verificationLevelZero = []
  for (let i = 0; i < levels.length; i++) {
    if (levels[i].title === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-title`).classList.remove('hide');
    }
    if (levels[i].image === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-image`).classList.remove('hide');
    }
    if (levels[i].text === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-text`).classList.remove('hide');
    }
    if (levels[i].minValue === false) {
      verificationArray.push(false);
      document.querySelector(`.number${i + 1} .alert.level-percentage`).classList.remove('hide');
    }
  }
  for (let i = 0; i < levels.length; i++) {
    if (levels[i].minValue === 0) {
      verificationLevelZero.push(i);
    }
  }
  if (verificationLevelZero.length === 0) {
    alert('Deve ter um nível com porcentagem 0')
  } else if (verificationLevelZero.length > 1) {
    alert('Tem mais de um nível com porcentagem 0')
  } else if (verificationLevelZero.length === 1) {
    if (verificationArray.length === 0) {
      alert('tudo OK nos levels')
      renderSucessPage();
    } else {
      alert('dados com problema nos levels')
    }
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
//saveQuizz();
