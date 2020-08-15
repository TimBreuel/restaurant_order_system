const connect = require("../models/connectionFn");
const TABLESCHEMA = require("../models/tablesSchema");

const addTables = (restaurantId, number) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.deleteMany({ restaurantId: restaurantId })
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
      })
      .catch((err) => console.log(err));
  });
};

const getAllTables = (id) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.find({ restaurantId: id })
          .then((tables) => resolve(tables))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

const setTableService = (tableId, boolean) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.findByIdAndUpdate(
          { _id: tableId.trim() },
          { service: boolean }
        )
          .then(() => resolve())
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => console.log(err));
  });
};

const setTablePayment = (tableId, boolean) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.findByIdAndUpdate({ _id: tableId.trim() }, { pay: boolean })
          .then(() => resolve())
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => console.log(err));
  });
};

module.exports = { addTables, getAllTables, setTableService, setTablePayment };
