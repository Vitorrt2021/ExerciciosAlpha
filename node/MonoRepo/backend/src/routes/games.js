const routerGames = require('express').Router();
const games = require('../controller/games.js')


routerGames.get('/',games.sendAll)
routerGames.post('/',games.addGame);

module.exports = routerGames
