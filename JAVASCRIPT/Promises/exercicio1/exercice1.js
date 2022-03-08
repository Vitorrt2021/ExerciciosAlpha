const error2SecondsBefore = () =>
  new Promise((resolve, reject) => setTimeout(reject, 2000));

error2SecondsBefore().catch((error) => console.log("Teu erro"));
