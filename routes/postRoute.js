const express = require("express");
const auth = require("../auth/auth");
const Post = require("../models/postModel");
const router = new express.Router();
const multer = require("multer");
const upload = require("../uploads/upload");

module.exports = router;
