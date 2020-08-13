//////////
//IMPORTS
const express = require("express");
const app = express();
const path = require("path");
const adminRoute = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const registerDataModules = require("./modules/registerModule");
const fileUpload = require("express-fileupload");
const adminModules = require("./modules/adminModule")
const fs = require("fs");
const session = require("express-session");
//creat session object options
const sessionOptions = {
  secret: "restaurant_order",
  //resave: false,  for debuger
  //saveUninitialized: true,
  //cookie: { secure: true }
  cookie: {},
};
////////////////
//MIDLEWEARE FN
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(session(sessionOptions)); //use a session
////////////////
//IMPORT ROUTES
app.use("/admin", adminRoute);
app.use("/login", loginRoute);

//////////////
//////////////
//HOME ROUTE
app.get("/", (req, res) => {
  res.render("index");
});

////////////
//HOME ROUTE
app.get("/register", (req, res) => {
  res.render("register");
});

////////////
//HOME ROUTE
app.post("/register", (req, res) => {
  console.log(req.body);

  const { restaurantName, firstName, lastName, email, password } = req.body;

  if (restaurantName && firstName && lastName && email && password) {
    registerDataModules
      .registerUser(restaurantName, firstName, lastName, email, password)
      .then(() => {
       res.json(1); //user register success
        //res.render("login")
      })
      .catch((error) => {
        console.log(error);
        if (error == "exist") {
          res.json(3); // user exist
        } else {
          res.json(4); // server error
        }
      });
  } else {
    res.json(2); // user register not seccess
  }
});

///////////////////////////////////
// VERIFY
app.get("/verify/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    registerDataModules
      .verifyRegister(id)
      .then(() => {
        res.render('login')
      })
      .catch((err) => {
        res.json(2);
      });
  } else {
    res.send("error");
  }
});





/////////////
//MENU ROUTE
app.get("/menu", (req, res) => {
  res.render("menu");
});

/////////////
//MENU ROUTE
app.get("/about", (req, res) => {
  res.render("about");
});

/////////////
//MENU ROUTE
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

/////////////
//MENU ROUTE
app.get("/elements", (req, res) => {
  res.render("elements");
});

/////////////
//MENU ROUTE
app.get("/contact", (req, res) => {
  res.render("contact");
});

///////
//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("App listening on port 4000!");
});
