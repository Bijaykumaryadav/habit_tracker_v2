const express = require("express");
const port = 8000;
const app = express();

//require database
const db = require("./config/mongoose");
const layout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

//setup the express session and passport
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// to use ejs layouts
app.use(layout);

//to use cookie-parser and urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//to set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//set up mongo store using mongo store
app.use(
  session({
    name: "habit_tracker",
    secret: "helloworld!",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 80 * 60,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://127.0.0.1/habit_trackers_db",
      },
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "successfully added mongostore");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//to use routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error on the code ${err}`);
  }
  console.log(`Server is running on the port ${port}`);
});
