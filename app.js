//////////
//IMPORTS
const express = require("express");
const app = express();
const path = require("path");
const adminRoute = require("./routes/adminRoute");

////////////////
//MIDLEWEARE FN
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

////////////////
//IMPORT ROUTES
app.use("/admin", adminRoute);

/////////////
//HOME ROUTE
app.get("/", (req, res) => {
  res.render("index");
});

///////
//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("App listening on port 4000!");
});
