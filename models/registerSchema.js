const mongoose = require('mongoose')
const connect = require('../models/connectionFn')
var passportLocalMongoose=require("passport-local-mongoose");


// get schema object
const { Schema } = mongoose
// creat user schema for register_form
const userSchema = new Schema({
    restaurant_name: {
        type: String,
        required: true,
        max: 100,
        min: 2
    },
    first_name: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    last_name: {
        type: String,
        required: true,
        max: 50,
        min: 2
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max: 100,
        min: 5
    },
    password: {
        type: String,
        required: true,
        max: 100,
        min: 2
    },
    verified : {
        type: Boolean,
        required: true
    },
 
    resetPasswordToken: {
        type: String,
       // required: false
    },

    resetPasswordExpires: {
        type: Date,
       // required: false
    },
    isAdmin: {
        type:Boolean,
        default:false
    }
   


} ,{timestamps: true})



// checkuser mongoose  for LOGIN form
function checkUser(email, password) {
    return new Promise((resolve, reject) => {
        connect().then(() => {
            userSchema.findOne({ email: email }).then(user => {
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



userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('restaurant_users', userSchema)
//module.exports = {checkExist, checkUser}



