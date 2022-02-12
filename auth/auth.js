const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.verifyUser = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "anysecretkey");
    User.findOne({ _id: data.userId })
      .then(function (result) {
        success: true;
        req.userInfo = result;
        next();
      })
      .catch(function (e) {
        res.json({ error: "Invalid Access access" });
      });
  } catch (e) {
    res.json({ error: " Invalid Access" });
  }
};
