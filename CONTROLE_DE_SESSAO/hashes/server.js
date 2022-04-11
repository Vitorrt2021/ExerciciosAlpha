const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const { createHmac } = require("crypto");

async function createToken(password) {
  const salt = await bcrypt.genSalt(12);
  const tokenHash = await bcrypt.hash(password, salt);
  const secret = "123ad123";
  const hash = createHmac("sha256", secret).update(tokenHash).digest("hex");
  return hash;
}

// const checkPassword = await bcrypt.compare(password, user.password);

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static("src"));

app.post("/setcookie", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const token = await createToken(password);
  console.log(token);
  res.cookie("Token", token, { maxAge: 100000, httpOnly: true });
  res.send("Cookie setado");
});

app.get("/getcookie", (req, res) => {
  const token = req.cookies["Token"];
  res.json({ token: token });
});

const port = 4002;
app.listen(port, () => {
  console.log("Ouvindo porta " + port);
});
