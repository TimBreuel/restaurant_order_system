const express = require("express");
const adminRoute = express.Router();
const adminModule = require("../modules/adminModule");

adminRoute.use((req, res, next) => {
  console.log(req.session.user);
  if (req.session.user) {
    //!  admin muss be login first
    next();
  } else {
    res.redirect("/login");
  }
});

//////////////////
//GET ADMIN INDEX
adminRoute.get("/", (req, res) => {
  res.render("adminIndex", { email: req.session.user.email });
});

////////////////
//GET ADMIN MENU
adminRoute.get("/menu", (req, res) => {
  adminModule
    .getAllMeals(req.session.user._id)
    .then((meals) => res.render("adminMenu", { meals: meals }))
    .catch((err) => console.log(err));
});

/////////////////////
//GET ADMIN ADD MEAL
adminRoute.get("/addMeal", (req, res) => {
  res.render("adminAddMeal", { restaurantId: req.session.user._id });
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
    restaurantId,
  } = req.body;
  console.log(req.body);
  const mealImg = req.files.mealImg;
  adminModule
    .addMeal(
      mealTitle,
      mealDiscription,
      mealNumber,
      mealPrice,
      mealCategory,
      mealImg,
      restaurantId
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
  adminModule
  .getAllMeals(req.session.user._id)
  .then((meals) => res.render("adminEditMeal", { meals: meals }))
  .catch((err) => console.log(err));
});

module.exports = adminRoute;
