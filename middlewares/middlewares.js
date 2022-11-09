function exposeUserToView(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
  }
  next();
}

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    console.log("logged in");
    return next();
  }
  res.redirect("/auth/login");
}

module.exports = { exposeUserToView, isLoggedIn };
