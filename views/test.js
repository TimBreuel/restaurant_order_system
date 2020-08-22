async.waterfall([
    function (done) {
       let token = buf.toString('hex');
         done(err , token)
       })
    },
    async function (token , done) {
    
     await  REGISTERSCHEMA.findOne({email:email}).then((user)=>{
       console.log("User Found=====>")
        console.log(user)
         user.resetPasswordToken = token;
         user.resetPasswordExpires = Data.now() + 3600000 ; //1hour
           user.save( err =>{
           console.log("start Saving====>")
            if(!err)
            done(err , token , user)
             else{console.log(err)}
           })
        }).catch(err =>{
  //        // req.flash('err' , 'no account ')
  //        //res.json(2)
        console.log(err)
         res.redirect('/forgotPassword')
         })
     
    },
   function (token , user , done) {
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
         text: `you are receving this link because you have requested the reset password , pls click an the following link, 
         http://${req.headers.host} /reset/ ${token} \n\n if you did not request this , pls ignore this email and your password will remain unchange `
     };
     smtpTransport.sendMail(mailOptions , function(err) {
       console.log('mailsend');
  //    // req.flash('success' , `An e-mail has been send to ${user.email} with further instractions`)
  //    //res.json(1)
       done(err , 'done')
     })
     }
   ] , function(err){
    if (err) {
       return next(err)
      res.redirect('/forgotPassword')
     }
   }  })
    

}); 
