const router = require("express").Router();
const User = require("./../models/User.model");
const bcrypt = require("bcryptjs");
const salt = 12;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.render("auth/signup", {
        errorMessage: "Username and password are required !",
      });
    }
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.render("auth/signup", {
        errorMessage: "Username already exists !",
      });
    }
    const generatedSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const newUser = User.create({
      username,
      password: hashedPassword,
    });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.render("auth/login", {
        errorMessage: "Username and password are required !",
      });
    }
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.render("auth/login", {
        errorMessage: "Wrong credentials !",
      });
    }

    const samePassword = await bcrypt.compare(password, foundUser.password);

    if (!samePassword) {
      return res.render("auth/login", {
        errorMessage: "Wrong credentials !",
      });
    }
    req.session.currentUser = foundUser;
    res.redirect("/main");
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
