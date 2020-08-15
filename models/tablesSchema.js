const mongoose = require("mongoose");

// get schema object
const { Schema } = mongoose;
// creat user schema for register_form
const tablesSchema = new Schema({
  table_number: {
    type: String,
    max: 200,
  },
  service: {
    type: Boolean,
    required: true,
  },
  pay: {
    type: Boolean,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
  },
});

module.exports = mongoose.model("restaurant_tables", tablesSchema);
