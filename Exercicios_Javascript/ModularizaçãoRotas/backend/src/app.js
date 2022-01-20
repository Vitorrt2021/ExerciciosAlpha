const express = require('express')
const app =  express()
const routes = require('./routes/routes.js')

app.use(express.static('pages'));
app.use(express.json());
app.use('/',routes);

module.exports = app;