const mongoose = require("mongoose");

const { Schema } = mongoose;

//creat restaurant_menu schema
const menuSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  restaurantId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("restaurant_menu", menuSchema);
