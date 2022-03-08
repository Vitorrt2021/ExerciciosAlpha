const pathLocalHost = "http://localhost:4000";

const button = document
  .querySelector("#form_button_send")
  .addEventListener("click", sendGet);

function loadIcon() {
  document.querySelector("#result").innerHTML = " ";
  document.querySelector("#result").className = "c-loader";
  document.querySelector("#form_button_send").disabled = true;
}
function loadResult(res) {
  document.querySelector("#result").className = " ";
  document.querySelector("#result").innerHTML = res.result;
  document.querySelector("#form_button_send").disabled = false;
}
function sendGet() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  loadIcon();
  const delay = getRandomInt(0, 4000);
  request(`${pathLocalHost}/${delay}`, requestOptions, loadResult);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function request(url, requestOptions, callback) {
  fetch(url, requestOptions)
    .then(function (response) {
      if (!response.ok) throw new Error("Erro ao executar requisição");
      return response.json();
    })
    .then(function (data) {
      if (!data) {
        alert("Não a informações valida");
      } else if (callback) {
        callback(data);
      }
    })
    .catch(function (error) {
      alert(error.message);
    });
}
