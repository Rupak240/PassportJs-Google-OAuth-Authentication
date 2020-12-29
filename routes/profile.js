const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If User is not Logged In...
    res.redirect("auth/login");
  } else {
    //  If User is Logged In...
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
