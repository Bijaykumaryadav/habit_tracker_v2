const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");
const passport = require("../config/passport-local-strategy");

router.get("/sign-up", usersController.signUp);
router.post("/create", usersController.create);
// The term "local" in passport.authenticate("local") refers to the Local Strategy provided by Passport.js
router.get(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-up" }),
  usersController.createSession
);

router.get(
  "/profile",
  passport.checkAuthentication,
  usersController.userProfile
);

router.get("/sign-out", usersController.destroySession);

module.exports = router;
