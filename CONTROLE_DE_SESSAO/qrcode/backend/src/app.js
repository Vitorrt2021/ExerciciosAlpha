const express = require("express");
const cors = require("cors");

require("express-async-errors");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const eventsRoutes = require("./routes/eventRoutes.js");

const cookieParser = require("cookie-parser");

const corsOption = {
  origin: ["http://localhost:4000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));

app.use(express.static("pages"));
app.use(express.json());
app.use(cookieParser());

app.use("/user/", userRoutes);
app.use("/events/", eventsRoutes);

app.use((error, req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    // console.log(error);
    res.status(200).json({
      statusCode: 500,
      message: "InternalServerError",
    });
  }
});

module.exports = app;
