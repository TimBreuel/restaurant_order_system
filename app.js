//////////
//IMPORTS
const express = require("express");
const app = express();
const path = require("path");
const adminRoute = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
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
app.use("/login", loginRoute);

//////////////
//////////////
//HOME ROUTE
app.get("/", (req, res) => {
  res.render("index");
});

/////////////
//MENU ROUTE
app.get("/menu", (req, res) => {
  res.render("menu");
});

/////////////
//MENU ROUTE
app.get("/about", (req, res) => {
  res.render("about");
});

/////////////
//MENU ROUTE
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

/////////////
//MENU ROUTE
app.get("/elements", (req, res) => {
  res.render("elements");
});

/////////////
//MENU ROUTE
app.get("/contact", (req, res) => {
  res.render("contact");
});

///////
//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("App listening on port 4000!");
});
