const User = require("../models/user.models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.get_all_users = (req, res) => {
  User.find()
    .exec()
    .then((user) => {
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.register_user = (req, res) => {
  User.find({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          err: "Email already exists or username has already been taken",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(404).json({
              err: err.message,
            });
          } else {
            const user = new User({
              username: req.body.username,
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            return user
              .save()
              .then((user) => {
                res.status(201).json({
                  message: "User created successfully",
                  data: user,
                });
              })
              .catch((err) => {
                res.status(400).json({
                  err: err.message,
                });
              });
          }
        });
      }
    });
};

exports.login_user = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          err: "This User does not exist !",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            err: "Authentication Failed, Password Incorrect",
          });
        } else if (result) {
          const token = jwt.sign(
            {
              username: user.username,
              name: user.name,
              email: user.email,
              userId: user._id,
              role: user.role,
            },
            "secret"
          );
          return res.status(200).json({
            message: "Authentication Successful, Logged In",
            token: token,
            data: user,
          });
        } else
          res.status(401).json({
            err: "Authentication Failed. Can't log In",
          });
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.get_user_profile = (req, res) => {
  User.findOne({ _id: req.user.userId })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ err: "No user is Logged In" });
      } else res.status(200).json({ data: user });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.delete_user_profile = (req, res) => {
  User.deleteOne({ _id: req.user.userId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "You just deleted your account.",
      });
    })
    .catch((err) => {
      res.status(404).json({
        err: err.message,
      });
    });
};

exports.update_user_profile = (req, res) => {
  const { userId } = req.user;
  const { name, username, email } = req.body;
  User.find({
    _id: { $nin: userId },
  }).then((user) => {
    if (user.find((user) => user.username === username)) {
      res.status(409).json({
        err: `${username} has already been taken. choose another username`,
      });
    }
    if (user.find((user) => user.email === email)) {
      res.status(409).json({
        err: `${email} has already been taken. choose another email address`,
      });
    } else {
      User.updateOne({ _id: userId }, { $set: { name, username, email } })
        .exec()
        .then((user) => {
          res.status(200).json({
            message: "User details updated succesfully",
            data: user,
          });
        })
        .catch((err) => {
          res.status(400).json({
            err: err.message,
          });
        });
    }
  });
};

//$or: [{ email: email }, { username: username }],

exports.update_user_profile_password = (req, res) => {
  const { userId } = req.user;
  const { password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(404).json({
        err: err.message,
      });
    } else {
      User.updateOne({ _id: userId }, { $set: { password: hash } })
        .exec()
        .then((user) => {
          res.status(200).json({
            message: "User password updated succesfully",
            data: user,
          });
        })
        .catch((err) => {
          res.status(400).json({
            err: err.message,
          });
        });
    }
  });
};

exports.get_any_user = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ err: "User does not exists" });
      } else res.status(200).json({ message: "User found", data: user });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.delete_any_user = (req, res) => {
  const { userId } = req.params;
  User.deleteOne({ _id: userId })
    .exec()
    .then((user) => {
      res.status(200).json({ message: "User has been succesfully deleted" });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};
