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

const error3SecondsBefore = () => {
  return new Promise((resolve, reject) => setTimeout(reject, 3000));
};

function requestPromise() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const promises = [fetch(pathLocalHost, requestOptions)];
  promises.push(error3SecondsBefore());

  Promise.race(promises)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      loadResult(res);
    })
    .catch(() => {
      loadResult({ result: "REQUISIÇÃO NÃO ATENDIDA POR TIMEOUT" });
    });
}

function sendGet() {
  loadIcon();
  requestPromise();
  // request(`${pathLocalHost}`, requestOptions, loadResult);
}

// function request(url, requestOptions, callback) {
//   fetch(url, requestOptions)
//     .then(function (response) {
//       if (!response.ok) throw new Error("Erro ao executar requisição");
//       return response.json();
//     })
//     .then(function (data) {
//       if (!data) {
//         alert("Não a informações valida");
//       } else if (callback) {
//         callback(data);
//       }
//     })
//     .catch(function (error) {
//       alert(error.message);
//     });
// }
