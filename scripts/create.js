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

let quizzTitle = null;
let quizzImage = null;
let quizzQuestionNumber = null;
let quizzLevelNumber = null;

renderCreateQuiz();
