const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const auth = require("../auth/auth");
const router = new express.Router();
const Post = require("../models/postModel");
const upload = require("../uploads/upload");

router.post("/user/register", function (req, res) {
  const username = req.body.username;
  User.findOne({ username: username }).then(function (userData) {
    if (userData != null) {
      res.json({ message: "Username already exists!" });
      return;
    }

    const password = req.body.password;
    bcryptjs.hash(password, 10, function (e, hashed_pw) {
      const email = req.body.email;
      const fullname = req.body.fullname;
      const address = req.body.address;
      const bio = req.body.bio;
      const profilepic = req.file.filename;
      var profilePic;
      if (req.file.filename == undefined) {
        profilePic = "";
      } else {
        profilePic = req.file.filename;
      }

      const userdata = new User({
        username: username,
        password: hashed_pw,
        email: email,
        fullname: fullname,
        address: address,
        bio: bio,
        profilepic: profilePic,
      });

      userdata
        .save()
        .then(function () {
          res.json({
            message: "Registration Success!",
            userdata,
            success: true,
            username: username,
          });
        })
        .catch(function (e) {
          res.json(e);
        });
    });
  });
});

router.post("/user/login", function (req, res) {
  const username = req.body.username;
  User.findOne({ username: username }).then(function (userdata) {
    if (userdata === null) {
      return res.json({ message: "Invalid username" });
    }
    // need to chek password
    const password = req.body.password;
    bcryptjs.compare(password, userdata.password, function (e, result) {
      // true - correct pw, false = incorrect pw
      if (result === false) {
        return res.json({ message: "Password Incorrect" });
      }
      // ticket generate
      const token = jwt.sign({ userId: userdata._id }, "anysecretkey");
      res.json({
        token: token,
        userId: userdata._id,
        message: "You have been logged in sucessfully",
        success: true,
      });
    });
  });
});



module.exports = router;