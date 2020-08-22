const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const userRoute = require("./src/routes/user.routes");
const articlesRoute = require("./src/routes/articles.routes");
const commentsRoutes = require("./src/routes/comments.routes");

const dotenv = require("dotenv");
dotenv.config();

//connect to the the Database
mongoose.connect(`mongodb://localhost:27017/newwave`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

//use cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/articles", articlesRoute);
app.use("/comments", commentsRoutes);
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

//err message that passes when a route that does not exist is passed!!
app.use((req, res, next) => {
  const error = new Error("You entered a route that does not exist !!");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    err: error.message,
  });
});

module.exports = app;
