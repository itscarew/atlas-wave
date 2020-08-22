const Comments = require("../models/comments.models");
const Articles = require("../models/articles.models");

exports.get_all_comments = (req, res) => {
  Comments.find()
    .exec()
    .then((comment) => {
      res.status(200).json({ data: comment });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.create_a_comment = (req, res) => {
  const { articleId } = req.params;
  const comment = new Comments({
    content: req.body.content,
    article: articleId,
    user: req.user.userId,
  });

  Articles.findById(articleId)
    .exec()
    .then((article) => {
      if (!article) {
        res.status(404).json({ err: "Article does not exist" });
      } else {
        return comment
          .save()
          .then((comment) => {
            res.status(201).json({
              message: `Commented on article ${articleId} successfully `,
              data: comment,
            });
          })
          .catch((err) => {
            res.status(400).json({
              err: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.get_all_comments_for_an_article = (req, res) => {
  const { articleId } = req.params;

  Articles.findById(articleId)
    .exec()
    .then((article) => {
      if (!article) {
        res.status(404).json({
          err: "This article does not exist",
        });
      } else {
        Comments.find({ article: articleId })
          .select("_id  content user  createdAt ")
          .populate("user", "_id username name email joined ")
          .exec()
          .then((comment) => {
            res.status(200).json({
              message: `Comments for ${articleId} article found`,
              data: comment,
            });
          })
          .catch((err) => {
            res.status(400).json({
              err: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.get_a_comment = (req, res) => {
  const { commentId } = req.params;

  Comments.findOne({ _id: commentId })
    .populate("user", "_id username name email joined ")
    .populate("article", "_id title content articleImage likeCount ")
    .exec()
    .then((comment) => {
      if (!comment) {
        res.status(404).json({
          err: `comment does not exist `,
        });
      } else
        res.status(200).json({
          message: `comment found successfully`,
          data: comment,
        });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.delete_a_comment = (req, res) => {
  const { commentId } = req.params;

  Comments.deleteOne({ _id: commentId })
    .exec()
    .then((comment) => {
      res.status(200).json({
        message: `Comment deleted succesfully`,
        data: comment,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};
