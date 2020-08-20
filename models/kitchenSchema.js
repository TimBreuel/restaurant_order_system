const mongoose = require("mongoose");

// get schema object
const { Schema } = mongoose;
// creat user schema for register_form
const kitchenSchema = new Schema({
  restaurantId: {
    type: String,
    max: 200,
    required: true,
  },
  tableId: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
  },
  tableNumber: {
    type: String,
  },
});

module.exports = mongoose.model("restaurant_kitchen", kitchenSchema);
