const mongoose = require('mongoose')


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
    }

})

module.exports = mongoose.model('restaurant_users', userSchema)



