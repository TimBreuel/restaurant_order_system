const connect = require("../models/connectionFn");
const TABLESCHEMA = require("../models/tablesSchema");

function addTables(restaurantId, number) {
  connect()
    .then((resolve, reject) => {
      for (let index = 0; index < number; index++) {
        const newTable = new TABLESCHEMA({
          table_number: index + 1,
          service: false,
          pay: false,
          restaurantId: restaurantId,
        });
        newTable.save();
      }
      resolve(1);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { addTables };
