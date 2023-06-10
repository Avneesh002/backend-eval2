const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "emi";

function authentication(req, res, next) {
  const token = req.headers.authorization;

  try {
    if (token) {
      const decoded = jwt.verify(token, secretKey);

      if (decoded) {
        req.body.userId = decoded.userId;
        next();
      } else {
        res.send({ msg: "Login First" });
      }
    } else {
      res.send({ msg: "Login First" });
    }
  } catch (error) {
    res.send({ msg: "Login First" });
  }
}

module.exports = { authentication };
