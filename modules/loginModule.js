const passwordHash = require('password-hash')
const connect = require('../models/connectionFn')
const REGISTERSCHEMA = require('../models/registerSchema')

// checkuser mongoose  for LOGIN form
function checkUser(email, password) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            REGISTERSCHEMA.findOne({ email: email }).then(user => {
                if (user) {
                    if (passwordHash.verify(password, user.password)) {
                        resolve(user)
                    } else {
                        reject(3)
                    }
                } else {
                    reject(3)
                }
            }).catch(error => {
                reject(error)
            })
        }).catch(error => {
            reject(error)
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

module.exports = {checkUser, checkExist}



