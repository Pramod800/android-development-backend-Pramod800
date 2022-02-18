const express = require("express");
const auth = require("../auth/auth");
const Post = require("../models/postModel");
const router = new express.Router();
const multer = require("multer");
const upload = require("../uploads/upload");

router.post(
  "/addblog",
  upload.single("thumbnail"),
  auth.verifyUser,
  async function (req, res) {
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const description = req.body.description;
    const thumbnail = req.file.filename;
    const postData = new Post({
      title: title,
      description: description,
      subtitle: subtitle,
      thumbnail: thumbnail,
      postedBy: req.userInfo,
    });
    req.userInfo.password = undefined;
    await postData
      .save()
      .then(() => {
        res.status(200).json({
          postData,
          message: "post has been sucessfully created",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

module.exports = router;
