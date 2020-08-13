const express = require("express");
const adminRoute = express.Router();





adminRoute.use((req , res,next)=> {
  
  console.log(req.session.user);
  if (req.session.user) {//!  admin muss be login first
      next()
  }else{
      res.redirect('/login')
  } 
}) 


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
//POST ADMIN ADD MEAL
adminRoute.post("/addMeal", (req, res) => {
  console.log(req.body);
  console.log(req.files);
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
