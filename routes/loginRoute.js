const express = require("express");
const loginRoute = express.Router();
const loginDataModules = require("../modules/loginModule");
const serviceModule = require("../modules/serviceModule");
const adminModule = require("../modules/adminModule");

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
  if (req.session.user) {
    const tableNummer = serviceModule
      .getTable(req.session.user._id, req.session.table_number)
      .then((table) => {
        return table;
      })
      .catch((err) => console.log(err));

    const promisemeals = adminModule
      .getAllMeals(req.session.user._id)
      .then((meals) => {
        return meals;
      })
      .catch((err) => console.log(err));

    Promise.all([tableNummer, promisemeals])
      .then((tableMenu) => {
        res.render("kitchen", { tableMenu });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("loginKitchen");
  }
});

//////////////////////////
//POST LOGIN/KITCHEN ROUTE
loginRoute.post("/kitchen", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    loginDataModules
      .checkUser(email.trim(), password)
      .then((user) => {
        req.session.user = user;
        res.json(1);
        // res.render('kitchen')
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
//POST TABLESERVICE PAYMENT
loginRoute.post("/service/tablePayment", (req, res) => {
  serviceModule
    .setTablePayment(req.body.tableId, false)
    .then(() => {
      res.json(1);
    })
    .catch((err) => console.log(err));
});

///////////////////////////////
//POST TABLESERVICE RESET TABLE
loginRoute.post("/service/resetTable", (req, res) => {
  serviceModule
    .resetTableOrder(req.body.tableId)
    .then(() => res.json(1))
    .catch((err) => console.log(err));
});

//////////////////
//GET LOGIN TABLE
loginRoute.get("/table", (req, res) => {
  // console.log(req.session.user);
  if (req.session.user) {
    const promiseTable = serviceModule
      .getTable(req.session.user._id, req.session.table_number)
      .then((table) => {
        return table;
      })
      .catch((err) => console.log(err));

    const promiseMenu = adminModule
      .getAllMeals(req.session.user._id)
      .then((meals) => {
        return meals;
      })
      .catch((err) => console.log(err));
    Promise.all([promiseTable, promiseMenu])
      .then((tableMenu) => {
        res.render("menuTable", { tableMenu });
      })
      .catch((err) => console.log(err));
  } else {
    res.render("loginTable");
  }
});

//////////////////
//GET LOGIN TABLE
loginRoute.post("/table", (req, res) => {
  const { email, password, table_number } = req.body;
  if (email && password) {
    loginDataModules
      .checkUser(email.trim(), password)
      .then((user) => {
        let testSession = req.session;
        testSession.user = user;
        testSession.table_number = table_number;
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

//////////////////
//GET LOGIN TABLE
loginRoute.post("/table/sendOrder", (req, res) => {
  const { restaurantId, tableId, order } = req.body;
  const promiseSetTable = serviceModule
    .setTableOrders(tableId, order)
    .then(() => {
      return;
    })
    .catch((err) => console.log(err));
  const promiseSetKitchen = serviceModule
    .setOrderToKitchen(restaurantId, tableId, order)
    .then(() => {
      return;
    })
    .catch((err) => console.log(err));
  Promise.all([promiseSetTable, promiseSetKitchen])
    .then(() => res.json(1))
    .catch(() => res.json(2));
});

//////////////////
//GET LOGIN TABLE
loginRoute.post("/table/needService", (req, res) => {
  serviceModule
    .setTableService(req.body.tableId, req.body.neddService)
    .then(() => res.json(1))
    .catch(() => res.json(2));
});

//////////////////
//GET LOGIN TABLE
loginRoute.post("/table/wantsToPay", (req, res) => {
  serviceModule
    .setTablePayment(req.body.tableId, req.body.wantsToPay)
    .then(() => res.json(1))
    .catch(() => res.json(2));
});

module.exports = loginRoute;
