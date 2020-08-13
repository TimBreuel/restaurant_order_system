const express = require("express");
const loginRoute = express.Router();
const loginDataModules = require('../modules/loginModule')

//////////////////
//GET LOGIN ROUTE
loginRoute.get("/", (req, res) => {
//  res.render("login");
  if (req.session._id) {
    res.redirect('/admin')
  }else{
      res.render('login')
  }  
 
});

loginRoute.post('/login', (req, res) => {  
 // console.log(req.body);
  if (req.body.email && req.body.password) {
    loginDataModules.checkUser(req.body.email.trim(), req.body.password).then(user => {
      req.session.user = user
    //  console.log(user); 
      res.json(1)
    }).catch(error => {
      if (error == 3) {
        res.json(3)
      } else {
        res.json(4)
      }
    })
  } else {
    res.json(2)
  }


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
