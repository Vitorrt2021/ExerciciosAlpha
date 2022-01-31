const express = require('express')
const cors = require("cors");

const app =  express()
const routes = require('./routes/routes.js')
const routerCalculator = require('./routes/calculator.js')
app.use(cors());

app.use(express.static('pages'));
app.use(express.json());

app.use('/employees/',routes);
app.use('/calculator/',routerCalculator);

module.exports = app;