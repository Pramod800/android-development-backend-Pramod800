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
      const userdata = new User({
        username: username,
        password: hashed_pw,
        email: email,
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

router.delete("/user/delete/:id", auth.verifyUser, function (req, res) {
  const _id = req.userInfo.id;
  User.findByIdAndDelete(_id)
    .then(function () {
      res.json("User Deleted");
    })
    .catch(function () {
      res.json("Error");
    });
});

router.get("/userprofile", auth.verifyUser, function (req, res) {
  const uid = req.userInfo._id;
  User.findOne({ _id: uid })
    .then((docs) => {
      res.json({ data: docs });
    })
    .catch((e) => {
      res.json(e);
    });
});

router.put(
  "/updateprofile",
  auth.verifyUser,
  upload.single("thumbnail"),
  (req, res) => {
    if (req.file == undefined) {
      const __id = req.userInfo._id;
      const fullname = req.body.fullname;
      const email = req.body.email;
      const address = req.body.address;
      const bio = req.body.bio;

      User.updateOne(
        { _id: __id },
        {
          fullname: fullname,
          address: address,
          bio: bio,
          email: email,
        }
      )
        .then((err) => {
          res.json({ message: "Update Successful!", success: true });
        })
        .catch((e) => {
          res.json({ message: "Went wrong!" });
        });
    } else {
      const __id = req.userInfo._id;
      const fullname = req.body.fullname;
      const address = req.body.address;
      const bio = req.body.bio;
      const email = req.body.email;
      const profilepic = req.file.filename;

      User.updateOne(
        { _id: __id },
        {
          fullname: fullname,
          address: address,
          bio: bio,
          email: email,
          profilepic: profilepic,
        }
      )
        .then((err) => {
          res.json({ message: "Update Successful!", success: true });
        })
        .catch((e) => {
          res.json({ message: "Went wrong!", success: false });
        });
    }
  }
);

router.get("/alluser", (req, res) => {
  User.find()
    .then((alluser) => {
      res.json({
        alluser,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
