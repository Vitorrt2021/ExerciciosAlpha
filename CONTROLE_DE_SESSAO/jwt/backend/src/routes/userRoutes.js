require("dotenv").config();

const { checkTokenUser, checkTokenAdm } = require("../controller/validation");
const errorHandler = require("../controller/errorHandler");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [
  {
    name: "Vitor",
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
createHash("coisas");

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
  const checkPassword = await bcrypt.compare(password, user[0].password);

  if (!checkPassword) {
    throw new errorHandler.BadRequest("Senha invalida");
  }
  const secret = process.env.SECRET;

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
  res.status(200).json({ message: "Logado com sucesso" });
});

router.post("/", checkTokenAdm, async (req, res) => {
  const { name, username, password, userType } = req.body;

  if (!username || !password || !name || !userType) {
    throw new errorHandler.BadRequest("Falta informações");
  }
  const passwordHash = await createHash(password);
  users.push({
    name,
    username,
    password: passwordHash,
    userType,
  });

  res.json({ message: "success" });
});

router.get("/", checkTokenUser, (req, res) => {
  res.json(users);
});
module.exports = router;
