const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");

const validation = {
  checkTokenAdm: (req, res, next) => {
    const token = req.cookies["token"];
    if (!token) {
      throw new errorHandler.Unauthorized("Acesso negado");
    }
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new errorHandler.Unauthorized("Acesso negado");
      }
      const userType = decoded.userType;
      if (userType !== "adm") {
        throw new errorHandler.Unauthorized("Acesso negado");
      }

      next();
    });
  },
  checkTokenUser: (req, res, next) => {
    const token = req.cookies["token"];
    if (!token) {
      throw new errorHandler.Unauthorized("Acesso negado");
    }
    const secret = process.env.SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new errorHandler.Unauthorized("Acesso negado");
      }
      next();
    });
  },
};

module.exports = validation;
