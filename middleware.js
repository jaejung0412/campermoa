module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "로그인 후 이용해 주세요");
    return res.redirect("/login");
  }
  next();
};
