// adding some things///////////
// git add .
// git commit -m "your commit"
//git push


const passwordHash = require('password-hash')
const REGISTERSCHEMA = require('../models/registerSchema')
const connect = require('../models/connectionFn')
const MENUSCHEMA = require('../models/menuSchema')
const emailSender = require('./emailSenderModule')




//! registerUser mongoose
function registerUser(rname,fname, lname, email, password) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            //creat new user      
            const newUser = new REGISTERSCHEMA({
                restaurant_name:rname,
                first_name: fname,
                last_name: lname,
                email: email,
                password: passwordHash.generate(password),
                varfied: false
            })
            //  save newuser in DB
            newUser.save().then(() => {
                resolve()
                // console.log(response);
         
                let msg ='Hi ' + fname + ' ' + lname + 'Welcome to our Website\n'
                msg += 'to verify you email address please click in the following link\n'
                 msg += 'http://localhost:4000/verify/' + newUser._id
                emailSender.sendEmail(email , 'verify Email' , msg).then(()=>{
                 resolve()
                }).catch(err =>{
                    reject(err)
                })
                
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
        })
    })
}



function verifyRegister(id) {
    return new Promise((resolve , reject) =>{

        connect().then(()=>{
            REGISTERSCHEMA.findOne({_id : id}).then(user =>{
                user.verfied = true
                resolve(user)
        
        }).catch(err =>{
            reject(err)
        })  
        })
      

    })
}



module.exports = {registerUser , verifyRegister}
