const express = require("express");
const adminRoute = express.Router();
const adminModule = require("../modules/adminModule");
const { response } = require("express");





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
  const {
    mealTitle,
    mealDiscription,
    mealNumber,
    mealPrice,
    mealCategory,
  } = req.body;
  const mealImg = req.files.mealImg;
  adminModule
    .addMeal(
      mealTitle,
      mealDiscription,
      mealNumber,
      mealPrice,
      mealCategory,
      mealImg,
      "123456789"
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
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
