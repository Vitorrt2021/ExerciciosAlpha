require("dotenv").config();
const router = require("express").Router();

const events = [
  {
    title: "Batalha",
    description: "Luta até a morte",
    date: "2002/10/23",
    time: "19:00",
  },
  {
    title: "Show Alok",
    description: "Musicas eletronicas",
    date: "2022/10/23",
    time: "23:00",
  },
  {
    title: "Partida Futebol",
    description: "Cruzeiro x Atlético",
    date: "2020/10/23",
    time: "20:00",
  },
];
const ticketsUsed = [];
router.get("/", (req, res) => {
  res.json({ msg: "success", events });
});

router.get("/entry", (req, res) => {
  const name = req.query.name;
  const ticket = req.query.ticket;

  const tic = ticketsUsed.filter((ele) => {
    return ele.name == name && ele.ticket == ticket;
  });
  console.log(tic);
  if (tic.length !== 0) {
    res.json({ msg: "failed", message: "Unauthorize" });
    return false;
  }

  ticketsUsed.push({
    name,
    ticket,
  });
  res.json({ msg: "success", message: "Authorize" });
});

module.exports = router;
