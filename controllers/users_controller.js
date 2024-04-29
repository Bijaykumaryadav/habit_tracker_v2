//controllers/users_controllers.js
const User = require("../models/user");
const mongoose = require("mongoose");

module.exports.signUp = function (req, res) {
  //if user is already signed in don't show the signin page rather show profile page
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "User SignUp",
  });
};

//to fetch data from signUp form
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      //conosle.log('password not matched!!');
      // req.flash('error','Password not matched!');
      return res.redirect("back");
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        // req.flash('error','email already registered!');
        return res.redirect("/");
      } else {
        const newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // userSignUpMailer.signUp(newUser);
        // req.flash('success','Account created Successfully!');
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.log("Error in creating user", err);
  }
};

//to create session of the user
module.exports.createSession = function (req, res) {
  // req.flash('success','Logged in Successfully!');
  return res.redirect("/users/profile");
};

//to render profile page
module.exports.userProfile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

//to signout
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      // req.flash("error", "Something Went Wrong!!");
      console.log("Something went wrong!!", err);
    }
    // req.flash("success", "Logged Out Successfully!!");
    return res.redirect("/");
  });
};
