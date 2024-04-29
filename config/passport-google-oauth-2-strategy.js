const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "315456870771-87vde7k627iumj3khmuvtppm76qver0h.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://127.0.0.1:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log("Error in authentication using google", err);
        return;
      }
    }
  )
);
