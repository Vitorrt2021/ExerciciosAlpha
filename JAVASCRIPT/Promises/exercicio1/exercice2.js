const resolve2SecondBefore = (a) =>
  new Promise((resolve, reject) => {
    if (a == "a") {
      setTimeout(resolve, 1000);
    } else {
      setTimeout(reject, 1000);
    }
  });

resolve2SecondBefore("s")
  .then((data) => {
    console.log("Teu certo");
  })
  .catch((e) => {
    console.log("Errou");
  });
