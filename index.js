const express = require("express");
const port = 8000;
const app = express();

//to set view engine
app.set('view engine','ejs');
app.set('views','./views');

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function (err) {
  if (err) {
    console.log(`Error on the code ${err}`);
  }
  console.log(`Server is running on the port ${port}`);
});
