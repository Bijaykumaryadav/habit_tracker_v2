//controllers/home_controller.js
module.exports.home = function (req, res) {
  //if user is already signed in don't show  the signin page rather show profile page
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("home", {
    title: "home",
  });
};
