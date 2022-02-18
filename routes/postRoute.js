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

router.get("/allblogs", (req, res) => {
  Post.find()
    .populate("postedBy")
    .then((alluserspost) => {
      res.json({
        alluserspost,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// To get singlepage blog
router.get("/singleblog/:bid", async (req, res) => {
  const _id = req.params.bid;
  await Post.findById(_id)
    .populate("Comments.postedBy")
    .populate("postedBy")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/blog", async (req, res) => {
  await Post.find({ postedBy: req.userInfo })
    .populate("postedBy")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
