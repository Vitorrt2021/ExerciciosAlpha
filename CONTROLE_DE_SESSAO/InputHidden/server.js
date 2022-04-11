const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
const users = [];

function getToken() {
  return Math.floor(Math.random() * 999999);
}

app.post("/", (req, res) => {
  const user = req.body;
  const token = getToken();
  users.push({ token: token, name: user.name });
  res.send({ msg: "Salvo com sucesso", token: token });
});

app.get("/token", (req, res) => {
  let token = req.header("Authorization");
  token = token.substring(6);
  const user = users.filter((us) => us.token == token);
  res.json(user);
});

const port = 3100;

app.listen(port, () => {
  console.log(`Ouvindo na porta ${port}`);
});
