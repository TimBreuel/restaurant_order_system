const mongoose = require("mongoose");

////////////////////////
//URL CONNECTION STRING
const connectionString =
  "mongodb+srv://restaurant_admin:123456abc@cluster0.hjd09.mongodb.net/restaurant_order_system?retryWrites=true&w=majority";

////////////////
//CONNECTION fn
function connect() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      resolve();
    } else {
      mongoose
        .connect(connectionString, {
          useUnifiedTopology: true,
          useCreateIndex: true,
          useNewUrlParser: true,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject();
        });
    }
  });
}

module.exports = connect;
