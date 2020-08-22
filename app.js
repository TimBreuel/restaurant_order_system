//////////
//IMPORTS
const express = require("express");
const app = express();
const path = require("path");
const adminRoute = require("./routes/adminRoute");
const loginRoute = require("./routes/loginRoute");
const registerDataModules = require("./modules/registerModule");
const fileUpload = require("express-fileupload");
const emailSender = require("./modules/emailSenderModule")
const session = require("express-session");
const REGISTERSCHEMA = require('./models/registerSchema')
const connect = require('./models/connectionFn')
const crypto = require("crypto")
const async = require("async")
const nodemailer = require('nodemailer');
const sensitiveData = require('./modules/sensitiveData')
var flash=require("connect-flash");

//creat session object options
const sessionOptions = {
  secret: "restaurant_order",
  cookie: {},
};


const cors = require('cors');//!

require('dotenv').config() //!

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
app.use(cors()) //!!
app.use(flash());

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
  // console.log(req.body);

  const { restaurantName, firstName, lastName, email, password } = req.body;

  if (restaurantName && firstName && lastName && email && password) {
    registerDataModules
      .registerUser(restaurantName, firstName, lastName, email, password)
      .then(() => {
        res.json(1); //user register success

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
        res.render("login");
      })
      .catch((err) => {
        res.json(2);
      });
  } else {
    res.render('404')
  }
});


////////////////////////
//!
app.get("/forgotPassword", (req, res) => {

  res.render("forgotPassword")
});

//put 
app.post('/forgotPassword', (req, res, next) => {
  const { email } = req.body

  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        let token = buf.toString('hex');
        done(err, token)
      })

    },

    function (token, done) {
      registerDataModules.checkExist({ email: email }).then(user => {
        if (user) {
          console.log(user)
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; //1hour
          user.save(err => {
            console.log("start Saving====>")
            if (!err)
              done(err, token, user)
            else { console.log(err) }
          })
        }
        else { console.log("not found"), res.json("not found") }
      }).catch(error => {
        console.log(error)
        res.json(error)
      })
    },
    function (token, user, done) {
      let smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'restaurantordersystem8@gmail.com',
          pass: sensitiveData.password()
        }
      })

      let mailOptions = {
        from: 'restaurantordersystem8@gmail.com',
        to: user.email,
        subject: 'Password Resset',
        text: 'you are receving this link because you have requested the reset password , pls click an the following link, '+
        ' http://' +req.headers.host+ '/reset/' + token + '\n\n '+'if you did not request this , pls ignore this email and your password will remain unchange '
      };
      smtpTransport.sendMail(mailOptions, function (error , info) {
        console.log('mailsend');
        //    //res.json(1)
        if (error) {
          console.log(error);
         // reject(error)
      } else {
      res.json(1)
         req.flash('success' , 'An e-mail has been send to'+ user.email+ 'with further instractions')
         // console.log(info.response);
          //resolve(info.response)
           done(err, 'done')
      }
      
      })
    }


  ], function (err) {
    if (err) {
      return next(err)
    }
  })

})


app.get('/reset/:token', (req, res) => {
  connect().then(() => {
    REGISTERSCHEMA.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt:  Date.now() } }, function (err, user) {
      if (!user) {
        //res.send("err, password reset token is invalid")
        alert('err')
        return res.redirect('/forgotPassword')
      } else {
        res.render('reset', { token: req.params.token })
      }
    })
  })
});

app.post('/reset/:token', (req, res) => {
  async.waterfall([
    function (done) {
      REGISTERSCHEMA.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
          //  res.send('err');
         console.log('user is not define');
        }
        if (req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save().then((user) => {
              req.session.user = user
              //res.json(1);
              res.redirect("/admin");
            // res.render("login");
            }).catch(err => {
              console.log(err);
            })
          })
        } else {
          console.log('err pass');
        }
      })
    },
    function (user, done) {
      let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'restaurantordersystem8@gmail.com',
          pass: sensitiveData.password()
        }
      })

      let mailOptions = {
        from: 'restaurantordersystem8@gmail.com',
        to: user.email,
        subject: 'Password Resset',
        text: 'hallo'+ '\n'
        +user.email+' this is a confirmation ' 
         
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        console.log('mailsend');
         req.flash('success' , 'An e-mail has been send to'+ user.email+ 'with further instractions')
        //res.json(1)
       
        done(err)
      })
    }
  ])
});

////////////////////////////////
//emailSender
app.get('/contact', (req, res) => {
  res.render('contact')
});


app.post('/contact', (req, res) => {
  console.log(req.body)
  const { name, email, subject, message } = req.body

  if (name != "" && name.length < 100) {
    emailSender.sendEmail2(name, email, subject, message).then(() => {
      res.json(1)
    }).catch(err => {
      res.json(2)
    })
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
