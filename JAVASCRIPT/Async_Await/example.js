const pros = (name) => {
  return new Promise((resolve, reject) => {
    if (name === "Vitor") {
      resolve("Your name is Vitor");
    } else {
      reject("Your name is not Vitor");
    }
  });
};

pros("Vitor")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

async function isName() {
  try {
    const res = await pros("itor");
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

isName();
