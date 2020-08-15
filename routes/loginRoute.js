const express = require("express");
const loginRoute = express.Router();
const loginDataModules = require("../modules/loginModule");
const serviceModule = require("../modules/serviceModule");

//////////////////
//GET LOGIN ROUTE
loginRoute.get("/", (req, res) => {
  //  res.render("login");
  if (req.session.user) {
    res.redirect("/admin");
  } else {
    res.render("login");
  }
});

loginRoute.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

loginRoute.post("/", (req, res) => {
  if (req.body.email && req.body.password) {
    loginDataModules
      .checkUser(req.body.email.trim(), req.body.password)
      .then((user) => {
        req.session.user = user;
        res.json(1);
        //res.render("login")
      })
      .catch((error) => {
        if (error == 3) {
          res.json(3);
        } else {
          res.json(4);
        }
      });
  } else {
    res.json(2);
  }
});

//////////////////////////
//GET LOGIN/KITCHEN ROUTE
loginRoute.get("/kitchen", (req, res) => {
  res.render("loginKitchen");
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
  res.render("loginBar");
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
  res.render("loginRestaurant");
});

/////////////////////
//POST RESTAURANT ROUTE
loginRoute.post("/restaurant", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
});

/////////////////////////
//GET LOGIN/SERVICE ROUTE
loginRoute.get("/service", (req, res) => {
  if (req.session.user) {
    serviceModule
      .getAllTables(req.session.user._id)
      .then((tables) => {
        res.render("service", { tables });
      })
      .catch((err) => console.log("Error post", err));
  } else {
    res.render("loginService");
  }
});

/////////////////////
//POST SERVICE ROUTE
loginRoute.post("/service", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (email && password) {
    loginDataModules
      .checkUser(email.trim(), password)
      .then((user) => {
        req.session.user = user;
        res.json(1);
      })
      .catch((error) => {
        if (error == 3) {
          res.json(3);
        } else {
          res.json(4);
        }
      });
  } else {
    res.json(2);
  }
});

////////////////////
//POST TABLE SERVICE
loginRoute.post("/service/tableService", (req, res) => {
  serviceModule
    .setTableService(req.body.tableId, false)
    .then(() => {
      res.json(1);
    })
    .catch((err) => console.log(err));
});

/////////////////////
//POST TABLE PAYMENT
loginRoute.post("/service/tablePayment", (req, res) => {
  serviceModule
    .setTablePayment(req.body.tableId, false)
    .then(() => {
      res.json(1);
    })
    .catch((err) => console.log(err));
});

module.exports = loginRoute;
