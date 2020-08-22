const express = require("express");

const Article = require("../models/articles.models");

const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  get_all_articles,
  create_an_article,
  get_any_article,
  delete_any_article,
  get_all_articles_by_any_user,
  explore_all_articlles,
} = require("../controllers/articles.controllers");

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");

//path where the images are going to be stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});

//specify file size and storage
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(
        new Error(
          "Ooopps...sorry. Only images(png,jpeg,jpg) are allowed. Updates will be coming soon"
        )
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

//route to get all articles
router.get("/", checkAuth, get_all_articles);

//route to explore other peoples articles
router.get("/explore", explore_all_articlles);

//route to create an article
router.post("/", upload.single("articleImage"), checkAuth, create_an_article);

//route to get any article
router.get("/:articleId", checkAuth, get_any_article);

//route to delete any article (admin priviledges)
router.delete("/:articleId", checkAuth, checkAdmin, delete_any_article);

//route to get all articles posted by any user
router.get("/user/:userId", checkAuth, get_all_articles_by_any_user);

router.post("/like/:articleId", checkAuth, (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;
  Article.findById(articleId)
    .then((article) => {
      if (
        article.likes.filter((like) => like.user.toString() === userId).length >
        0
      ) {
        return res
          .status(400)
          .json({ err: "user has already liked this post" });
      }

      article.likes.unshift({ user: userId });
      article.save().then((article) => res.json(article));
    })
    .catch((err) => {
      res.status(404).json({ err: "No articles found" });
    });
});

router.post("/unlike/:articleId", checkAuth, (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;
  Article.findById(articleId)
    .then((article) => {
      if (
        article.likes.filter((like) => like.user.toString() === userId)
          .length === 0
      ) {
        return res.status(400).json({ err: "you havent liked this post yet" });
      }

      //get Index
      const removeIndex = article.likes
        .map((like) => like.user.toString())
        .indexOf(userId);

      //splice out of array
      article.likes.splice(removeIndex, 1);
      article.save().then((post) => res.json(article));
    })
    .catch((err) => {
      res.status(404).json({ err: "No articles found" });
    });
});

module.exports = router;
