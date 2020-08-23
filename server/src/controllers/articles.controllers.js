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
    articleImage: req.file.filename,
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

exports.like_any_article = (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;
  Articles.findById(articleId)
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
};

exports.unlike_any_article = (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.user;
  Articles.findById(articleId)
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
};
