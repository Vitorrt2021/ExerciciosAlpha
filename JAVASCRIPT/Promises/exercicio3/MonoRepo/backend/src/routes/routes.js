const router = require("express").Router();

router.get("/", (req, res) => {
  const delay = getRandomInt(0, 5000);
  setTimeout(() => {
    res.send({ result: "REQUISIÇÃO ATENDIDA" });
  }, delay);

  // const response = (delay) => {
  //   return new Promise((resolve, reject) => {
  //     if (delay < 3000) {
  //       setTimeout(resolve, delay);
  //     } else {
  //       setTimeout(reject, 3000);
  //     }
  //   });
  // };
  //   res.send({ result: "Fora" });

  // response(delay)
  //   .then(() => {
  //     res.send({ result: "REQUISIÇÃO ATENDIDA" });
  //   })
  //   .catch(() => {
  //     res.send({ result: "REQUISIÇÃO NÃO ATENDIDA POR TIMEOUT" });
  //   });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;
