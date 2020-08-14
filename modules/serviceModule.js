const connect = require("../models/connectionFn");
const TABLESCHEMA = require("../models/tablesSchema");

const addTables = (restaurantId, number) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        let newTables = [];
        for (let index = 0; index < number; index++) {
          const newTable = new TABLESCHEMA({
            table_number: index + 1,
            service: false,
            pay: false,
            restaurantId: restaurantId,
          });
          newTables.push(newTable);
        }
        TABLESCHEMA.insertMany(newTables)
          .then(() => {
            resolve(1);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

const getAllTables = (restaurantId) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      TABLESCHEMA.find({ restaurantId: restaurantId })
        .then((tables) => resolve(tables))
        .catch((err) => console.log(err));
    });
  });
};

module.exports = { addTables, getAllTables };
