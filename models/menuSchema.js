const mongoose = require('mongoose')


const { Schema } = mongoose

//creat restaurant_menu schema
const menuSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    img: {
        type: [String],
        required: true,
        min: 1
    }
})


module.exports = mongoose.model('restaurant_menu', menuSchema)