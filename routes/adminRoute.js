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
  res.render("adminIndex", { user: req.session.user });
});

///////////////
//GET SETTINGS
adminRoute.get("/settings", (req, res) => {
  res.render("settings", { user: req.session.user });
});

////////////////
//GET ADMIN MENU
adminRoute.get("/menu", (req, res) => {
  adminModule
    .getAllMeals(req.session.user._id)
    .then((meals) => res.render("menu", { meals: meals }))
    .catch((err) => console.log(err));
});

////////////////
//GET ADMIN MENU
adminRoute.get("/adminMenu", (req, res) => {
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
  let mealImg;
  if (req.files) {
    mealImg = req.files.mealImg;
  } else {
    mealImg = "";
  }

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
adminRoute.get("/editMeal/:id", (req, res) => {
  adminModule
    .getMeal(req.params.id)
    .then((meal) => res.render("adminEditMeal", { meal: meal }))
    .catch((err) => console.log(err));
});



adminRoute.post('/editMeal', (req, res) => {
  const { mealTitle, mealDiscription, mealNumber, mealPrice,mealImg, mealCategory } = req.body
 //console.log(oldImgsUrlArr);
  adminModule.updateMeal( mealTitle, mealDiscription, mealNumber, mealImg, mealPrice, mealCategory,req.session.user._id ).then(() => {
    res.json(1)

  }).catch(error => {
    res.json(2)
  })



})





module.exports = adminRoute;
