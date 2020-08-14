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
adminRoute.get("/editMeal", (req, res) => {
  adminModule
    .getAllMeals(req.session.user._id)
    .then((meals) => res.render("adminEditMeal", { meals: meals }))
    .catch((err) => console.log(err));
});



adminRoute.post('/editMeal', (req, res) => {
  const { newMealTitle, mealDedcription, newMealNumber, newPrice,newImg, newMealCategory } = req.body
 //console.log(oldImgsUrlArr);
  adminModule.updateMeal( newMealTitle, mealDedcription, newMealNumber, newImg, newPrice, newMealCategory,req.session.user._id).then(() => {
    res.json(1)

  }).catch(error => {
    res.json(2)
  })



})





module.exports = adminRoute;
