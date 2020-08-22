const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");
const {
  get_all_users,
  register_user,
  login_user,
  get_user_profile,
  delete_user_profile,
  update_user_profile,
  update_user_profile_password,

  get_any_user,
  delete_any_user,
} = require("../controllers/users.controllers");

const {
  get_user_profile_article,
  delete_user_profile_article,
  update_user_profile_article,
} = require("../controllers/articles.controllers");

//route to get all users (admin priviledges)
router.get("/", checkAuth, checkAdmin, get_all_users);

//route to register a user
router.post("/register", register_user);

//route to login a user
router.post("/login", login_user);

//route to get user profile
router.get("/profile", checkAuth, get_user_profile);

//route to delete user profile
router.delete("/profile", checkAuth, delete_user_profile);

//route to update user profile
router.patch("/profile", checkAuth, update_user_profile);

//route to update user profile password
router.patch("/profile/password", checkAuth, update_user_profile_password);

//route to get all user profile articles
router.get("/profile/articles", checkAuth, get_user_profile_article);

//route to delete user profile article
router.delete(
  "/profile/articles/:articleId",
  checkAuth,
  delete_user_profile_article
);

//route to update user profle article
router.patch(
  "/profile/articles/:articleId",
  checkAuth,
  update_user_profile_article
);

//route to get any user
router.get("/:userId", checkAuth, get_any_user);

//route to delete any user (admin priviledges)
router.delete("/:userId", checkAuth, checkAdmin, delete_any_user);

module.exports = router;
