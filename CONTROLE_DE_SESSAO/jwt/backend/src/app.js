const express = require("express");
const cors = require("cors");

require("express-async-errors");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
app.use(cors());

app.use(express.static("pages"));
app.use(express.json());
app.use(cookieParser());

app.use("/user/", userRoutes);

app.use((error, req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    console.log(error);
    res.status(200).json({
      statusCode: 500,
      message: "InternalServerError",
    });
  }
});

module.exports = app;
