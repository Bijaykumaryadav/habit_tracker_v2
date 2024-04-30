//controllers/users_controllers.js
const User = require("../models/user");
const mongoose = require("mongoose");
const userSignUpMailer = require("../mailers/user_sign_up_mailer");
const forgottenPasswordMailer = require("../mailers/forgotten_password_mailer");
const crypto = require("crypto");

module.exports.signUp = function (req, res) {
  //if user is already signed in don't show the signin page rather show profile page
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "User SignUp",
  });
};

// to fetch data from signUp form
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      // console.log('Password not matched!!');
      req.flash("error", "Password not matched!");
      return res.redirect("back");
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        req.flash("error", "email already registered!");
        return res.redirect("/");
      } else {
        const newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        userSignUpMailer.signUp(newUser);
        req.flash("success", "Account created Successfully!");
        return res.redirect("/");
      }
    }
  } catch (err) {
    console.log("error in creating user", err);
  }
};

//to create session of the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully!");
  return res.redirect("/users/profile");
};

//to render profile page
module.exports.userProfile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

//to show form for email filling of forget password email form
module.exports.forgottenPassword = async function (req, res) {
  return res.render("forgotten_password", {
    title: "Forgot Password!",
  });
};

// to collect data from the above form
module.exports.forgottenPasswordEmailCollect = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      console.log(user.email);
      user.save();
      forgottenPasswordMailer.forgottenPassword(user.token, user);
      req.flash("success", "Reset Email sent!");
      return res.redirect("/");
    } else {
      req.flash("error", "Email not registered!");
      return res.redirect("/");
    }
  } catch (err) {
    console.log("error in finding user while reseting password", err);
  }
};

// render the update password form
module.exports.resetPasswordForm = async function (req, res) {
  try {
    const user = await User.findOne({ token: req.params.id });
    if (user) {
      return res.render("reset_password", {
        title: "Reset Password",
        user_id: user._id,
      });
    } else {
      req.flash("error", "Unauthorized Access");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in sending mail", err);
    return res.redirect("back");
  }
};

//to collect password from above form and finally update user password
module.exports.updatePassword = async function (req, res) {
  try {
    const user = await User.findById(req.body.user_id);
    if (user) {
      user.password = req.body.password;
      user.save();
      req.flash("success", "Password updated Successfully");
      return res.redirect("/");
    } else {
      req.flash("error", "Unauthorized Access");
      return res.redirect("/");
    }
  } catch (err) {
    console.log("error in updating password ", err);
    req.flash("error", "Internal Server Error!!");
    return res.redirect("/");
  }
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
