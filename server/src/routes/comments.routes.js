const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");

const {
  get_all_comments,
  create_a_comment,
  get_all_comments_for_an_article,
  get_a_comment,
  delete_a_comment,
} = require("../controllers/comment.controllers");

//routes to get all comments (admin priviledges only)
router.get("/", checkAuth, checkAdmin, get_all_comments);

//route to create a comment (comment an article)
router.post("/articles/:articleId", checkAuth, create_a_comment);

//route to get all comments assigned to an article
router.get("/articles/:articleId", checkAuth, get_all_comments_for_an_article);

//route to get a comment, (get details of a comment)
router.get("/:commentId", checkAuth, get_a_comment);

//route to delete a comment
router.delete("/:commentId", checkAuth, delete_a_comment);

module.exports = router;
