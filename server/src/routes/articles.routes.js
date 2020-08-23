const express = require("express");
const mongoose = require("mongoose");

const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const crypto = require("crypto");
const {
  get_all_articles,
  create_an_article,
  get_any_article,
  delete_any_article,
  get_all_articles_by_any_user,
  explore_all_articlles,
  like_any_article,
  unlike_any_article,
} = require("../controllers/articles.controllers");

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");

const dotenv = require("dotenv");
dotenv.config();

const url = `mongodb+srv://itscarew:${process.env.MONGOPASSW0RD}@atlas-wave-db.yqscb.mongodb.net/${process.env.MONGODBNAME}?retryWrites=true&w=majority`;

const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename:
            new Date().toISOString().replace(/[\/\\:]/g, "_") + filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(
        new Error("Ooopps...sorry. Only images(png,jpeg,jpg) are allowed.")
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

let gfs;
connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

//route to get all articles
router.get("/", checkAuth, get_all_articles);

//route to explore other peoples articles
router.get("/explore", explore_all_articlles);

//route to create an article
router.post("/", upload.single("articleImage"), checkAuth, create_an_article);

//route to get any article
router.get("/:articleId", checkAuth, get_any_article);

//route to get any article
router.get("/articleImage/:filename", (req, res) => {
  // console.log('id', req.params.id)
  gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

//route to delete any article (admin priviledges)
router.delete("/:articleId", checkAuth, checkAdmin, delete_any_article);

//route to get all articles posted by any user
router.get("/user/:userId", checkAuth, get_all_articles_by_any_user);

router.post("/like/:articleId", checkAuth, like_any_article);

router.post("/unlike/:articleId", checkAuth, unlike_any_article);

module.exports = router;
