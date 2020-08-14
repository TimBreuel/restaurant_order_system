const express = require("express");
const adminRoute = express.Router();
const adminModule = require("../modules/adminModule");
const serviceModule = require("../modules/serviceModule");

adminRoute.use((req, res, next) => {
  // console.log(req.session.user);
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

///////////////
//POST SETTINGS
adminRoute.post("/settings", (req, res) => {
  const { tables, restaurantId } = req.body;
  serviceModule
    .addTables(restaurantId, tables)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
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
  const mealId = req.params.id
  adminModule
    .getMeal(mealId)
    .then((meal) => res.render("adminEditMeal", { meal: meal }))
    .catch((err) => console.log(err));
});

adminRoute.post("/editMeal", (req, res) => {
  const {
    mealId,
    mealTitle,
    mealDiscription,
    mealNumber,
    mealPrice,
    mealCategory,
  } = req.body;
  //console.log(oldImgsUrlArr);
  let mealImg = null
  if(req.files) {
   mealImg = req.files.mealImg
  }
  
  adminModule
    .updateMeal(
      mealId,
      mealTitle,
      mealDiscription,
      mealNumber,
      mealPrice,
      mealImg,
      
      mealCategory,
      req.session.user._id ,
    )
    .then(() => {
      res.json(1);
    })
    .catch((error) => {
      res.json(2);
    });
});

module.exports = adminRoute;
