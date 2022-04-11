//     <div class="input_container">
//     <label for="email_input">Email</label>
//     <input id='email_input' type="email">
// </div>

// <div class="input_container">
//     <label for="password_input">Senha</label>
//     <input id='password_input' type="password">
// </div>

document.querySelector("#form_submit").addEventListener("click", setData);
document.querySelector("#request_button").addEventListener("click", getData);

async function setData(e) {
  e.preventDefault();
  document.querySelector("form").style.display = "none";
  document.querySelector("section").style.display = "flex";
  const register = {
    email: document.querySelector("#email_input").value,
    password: document.querySelector("#password_input").value,
  };
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    };
    const res = await fetch("http://localhost:4002/setcookie", requestOptions);
  } catch {
    (err) => {
      console.log(err);
    };
  }
}

async function getData() {
  try {
    const res = await fetch("http://localhost:4002/getcookie");
    const data = await res.json();

    const email = data.email;
    const password = data.password;
    document.querySelector("#response").innerHTML = `
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Senha:</strong> ${password}</li>
    `;
  } catch {
    (e) => {
      console.log(e);
    };
  }
}
