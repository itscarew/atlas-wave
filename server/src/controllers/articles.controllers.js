const User = require("../models/user.models");
const Articles = require("../models/articles.models");

exports.get_all_articles = (req, res) => {
  Articles.find()
    .exec()
    .then((article) => {
      res.status(200).json({ data: article });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.explore_all_articlles = (req, res) => {
  Articles.find()
    .populate("user", "_id username name email joined ")
    .populate("likes.user")
    .exec()
    .then((article) => {
      res.status(200).json({ data: article });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.create_an_article = (req, res) => {
  const article = new Articles({
    title: req.body.title,
    content: req.body.content,
    articleImage: req.file.path,
    user: req.user.userId,
  });

  return article
    .save()
    .then((article) => {
      res.status(201).json({
        message: "Article created",
        data: article,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.get_any_article = (req, res) => {
  const { articleId } = req.params;
  Articles.findOne({ _id: articleId })
    .populate("user", "_id username name email joined ")
    .populate("likes.user")
    .exec()
    .then((article) => {
      if (!article) {
        res.status(404).json({ err: "Article does not exist" });
      } else res.status(200).json({ message: "Article found", data: article });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.get_all_articles_by_any_user = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ err: "This user does not exists !!" });
      } else {
        Articles.find({ user: userId })
          .populate("user")
          .populate("likes.user")
          .select(
            "_id title content user articleImage likes createdAt updatedAt"
          )
          .exec()
          .then((article) => {
            res.status(200).json({
              message: `Articles posted by user ${userId}`,
              data: article,
            });
          })
          .catch((err) => {
            res.status(400).json({ err: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.get_user_profile_article = (req, res) => {
  const { userId } = req.user;
  Articles.find({ user: userId })
    .populate("user")
    .populate("likes.user")
    .exec()
    .then((article) => {
      res.status(200).json({ message: "All your article", data: article });
    })
    .catch((err) => {
      err: err.message;
    });
};

exports.delete_user_profile_article = (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;
  Articles.deleteOne({ $and: [{ _id: articleId }, { user: userId }] })
    .exec()
    .then((article) => {
      res
        .status(200)
        .json({ message: "Article deleted successfully", data: article });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.update_user_profile_article = (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;

  Articles.updateOne({
    $and: [
      { _id: articleId },
      { user: userId },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          updatedAt: new Date(),
        },
      },
    ],
  })
    .exec()
    .then((article) => {
      res.status(200).json({
        message: "Article details updated succesfully",
        data: article,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.delete_any_article = (req, res) => {
  const { articleId } = req.params;
  Articles.deleteOne({ _id: articleId })
    .exec()
    .then((article) => {
      res
        .status(200)
        .json({ message: "Article deleted successfully", data: article });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};
