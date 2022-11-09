const router = require("express").Router();
const {
  exposeUserToView,
  isLoggedIn,
} = require("./../middlewares/middlewares");

/* GET home page */

router.use("/auth", require("./auth.route"));
router.use(exposeUserToView);
router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/profile", (req, res, next) => {
//   const { currentUser } = req.session;
//   console.log({ currentUser });
//   res.render("profile", { currentUser });
// });

router.get("/main", isLoggedIn, (req, res, next) => {
  res.render("main");
});

router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private");
});

module.exports = router;
