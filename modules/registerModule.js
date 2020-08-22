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
function registerUser(rname,fname, lname, email, password  ) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            //creat new user      
            const newUser = new REGISTERSCHEMA({
                restaurant_name:rname,
                first_name: fname,
                last_name: lname,
                email: email,
                password: passwordHash.generate(password),
                verified: false,
      
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
            REGISTERSCHEMA.findOneAndUpdate({_id:id},{verified: true}).then(user=>resolve(user)).catch(err =>{
            reject(err)
        })  
        })
      

    })
}



function findUserEmail(email){
    return new Promise((resolve , reject)=>{
        connect().then(()=>{
            REGISTERSCHEMA.findOne({email:email}).then(user =>{
                resolve(user)
            }).catch(err =>{
                err
            })
        })
    })
}


const checkExist=obj=>{
    return new Promise((resolve,reject)=>{
        connect().then(()=>{
            REGISTERSCHEMA.findOne(obj).then(val=>{
                if(val){
                    resolve(val)
                }else{
                    reject({error:"not found"})
                }
            }).catch(error=>{
                reject(error)
            })
        })
})
}



module.exports = {registerUser , verifyRegister , findUserEmail , checkExist}
