const express = require("express");
const PostController = require('../controller/post');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/upload-file');

const router = express.Router();


router.post(
  "",checkAuth,
  extractFile,
  PostController.createPost
);

router.put(
  "/:id",checkAuth,
  extractFile,
  PostController.updatePost
);

router.get("",PostController.fetchPosts);

router.get("/:id", PostController.fetchById);

router.delete("/:id", checkAuth, PostController.deletePosts);

module.exports = router;
