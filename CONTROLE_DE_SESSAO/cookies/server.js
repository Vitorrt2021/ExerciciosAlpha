const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static("src"));

app.post("/setcookie", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  res.cookie("email", email, { maxAge: 100000, httpOnly: true });
  res.cookie("password", password, { maxAge: 100000, httpOnly: true });
  res.send("Cookie setado");
});

app.get("/getcookie", (req, res) => {
  const email = req.cookies["email"];
  const password = req.cookies["password"];
  const login = {
    email,
    password,
  };
  res.json(login);
  console.log(email);
});

const port = 4002;
app.listen(port, () => {
  console.log("Ouvindo porta " + port);
});
