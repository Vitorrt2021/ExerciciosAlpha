const router = require("express").Router();

router.get("/:delay", (req, res) => {
  const delay = req.params.delay;
  const response = (delay) => {
    return new Promise((resolve, reject) => {
      if (delay < 3000) {
        setTimeout(resolve, delay);
      } else {
        setTimeout(reject, 3000);
      }
    });
  };
  //   res.send({ result: "Fora" });

  response(delay)
    .then(() => {
      res.send({ result: "REQUISIÇÂO ATENDIDA" });
    })
    .catch(() => {
      res.send({ result: "REQUISIÇÂO NÂO ATENDIDA POR TIMEOUT" });
    });
});

module.exports = router;
