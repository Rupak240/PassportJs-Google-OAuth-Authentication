const router = require("express").Router();
const passport = require("passport");

// Auth Login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// Auth Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Auth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = router;
