const express = require("express");
const loginRoute = express.Router();

/////////////
//LOGIN ROUTE
loginRoute.get("/", (req, res) => {
  res.render("login");
});

/////////////
//LOGIN/KITCHEN ROUTE
loginRoute.get("/kitchen", (req, res) => {
  res.render("kitchen");
});

/////////////
//LOGIN/BAR ROUTE
loginRoute.get("/bar", (req, res) => {
  res.render("bar");
});

/////////////
//LOGIN/BAR ROUTE
loginRoute.get("/restaurant", (req, res) => {
  res.render("restaurant");
});

module.exports = loginRoute;
