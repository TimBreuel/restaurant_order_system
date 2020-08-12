const express = require("express");
const adminRoute = express.Router();

//////////////////
//GET ADMIN INDEX
adminRoute.get("/", (req, res) => {
  res.render("adminIndex");
});

////////////////
//GET ADMIN MENU
adminRoute.get("/menu", (req, res) => {
  res.render("adminMenu");
});

/////////////////////
//GET ADMIN ADD MEAL
adminRoute.get("/addMeal", (req, res) => {
  res.render("adminAddMeal");
});

/////////////////////
//GET ADMIN ADD MEAL
adminRoute.get("/deleteMeal", (req, res) => {
  res.render("adminDeleteMeal");
});

/////////////////////
//GET ADMIN ADD MEAL
adminRoute.get("/editMeal", (req, res) => {
  res.render("adminEditMeal");
});

module.exports = adminRoute;
