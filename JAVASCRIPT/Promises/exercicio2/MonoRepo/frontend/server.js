const express = require("express");
const app = express();

app.use("/promise", express.static("./src/promise"));

const port = 3005;
app.listen(port, () => console.log(`Ouvindo na porta ${port} ...`));
