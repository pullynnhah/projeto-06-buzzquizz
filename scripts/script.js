function load() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

function dump(key, value) {
  const data = load();
  data[key] = value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function remove(key) {
  const data = load();
  delete data[key];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const URI = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
const LOCAL_STORAGE_KEY = "buzz-quizz";
const main = document.querySelector("main");
