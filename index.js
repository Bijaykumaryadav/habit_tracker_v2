const express = require("express");
const port = 8000;
const app = express();

//require database
const db = require("./config/mongoose");

const layout = require("express-ejs-layouts");

// to use ejs layouts
// app.use(layout);

app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//to set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//to use routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error on the code ${err}`);
  }
  console.log(`Server is running on the port ${port}`);
});
