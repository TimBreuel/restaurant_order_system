const express = require("express");
const loginRoute = express.Router();

//////////////////
//GET LOGIN ROUTE
loginRoute.get("/", (req, res) => {
  res.render("login");
});

//////////////////////////
//GET LOGIN/KITCHEN ROUTE
loginRoute.get("/kitchen", (req, res) => {
  res.render("kitchen");
});

//////////////////////////
//POST LOGIN/KITCHEN ROUTE
loginRoute.post("/kitchen", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
});

/////////////////////
//GET LOGIN/BAR ROUTE
loginRoute.get("/bar", (req, res) => {
  res.render("bar");
});

/////////////////////
//POST LOGIN/BAR ROUTE
loginRoute.post("/bar", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
});

/////////////////////
//GET LOGIN/BAR ROUTE
loginRoute.get("/restaurant", (req, res) => {
  res.render("restaurant");
});

module.exports = loginRoute;
