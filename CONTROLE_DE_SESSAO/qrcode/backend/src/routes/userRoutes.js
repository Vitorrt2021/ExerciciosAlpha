require("dotenv").config();

const { checkTokenUser, checkTokenAdm } = require("../controller/validation");
const errorHandler = require("../controller/errorHandler");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [
  {
    fullname: "Vitor",
    username: "vitorrt",
    password: "$2b$12$RytlZnISTynG8.snnjW89OxfCkeTsKCnAKVpeWT8yCmYalGFkoQ3.",
    userType: "adm",
  },
];

async function createHash(password) {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new errorHandler.BadRequest("Falta informações");
  }

  const user = users.filter((user) => {
    return user.username == username;
  });

  if (!user) {
    throw new errorHandler.NotFound("Username não existe");
  }
  console.log(user[0]);
  const checkPassword = await bcrypt.compare(password, user[0].password);
  console.log("d");

  if (!checkPassword) {
    throw new errorHandler.BadRequest("Senha invalida");
  }
  const secret = process.env.SECRET;
  console.log("d");
  const token = jwt.sign(
    {
      username: user[0].username,
      userType: user[0].userType,
    },
    secret,
    {
      expiresIn: 6000,
    }
  );
  console.log(true);
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  res.status(200).json({ msg: "success", message: "Logado com sucesso" });
});

router.post("/", checkTokenAdm, async (req, res) => {
  const { fullname, username, password, userType } = req.body;

  if (!username || !password || !fullname || !userType) {
    throw new errorHandler.BadRequest("Falta informações");
  }
  const passwordHash = await createHash(password);
  users.push({
    fullname,
    username,
    password: passwordHash,
    userType,
  });

  res.json({ msg: "success", message: "success" });
});

router.get("/", checkTokenUser, (req, res) => {
  res.json({ msg: "success", users });
});
module.exports = router;
