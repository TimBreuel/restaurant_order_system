const connect = require("../models/connectionFn");
const TABLESCHEMA = require("../models/tablesSchema");
const KITCHENSCHEMA = require("../models/kitchenSchema");
const MENUSCHEMA = require("../models/menuSchema");

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
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

const getAllTables = (id) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.find({ restaurantId: id })
          .then((tables) => resolve(tables))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
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
      .catch((err) => reject(err));
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
      .catch((err) => reject(err));
  });
};

//////////////////////////////////
//SET TABKE ORDERS TO THE KITCHEN
const setTableOrders = (tableId, orderArr) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.findByIdAndUpdate(
          { _id: tableId.trim() },
          { $push: { orders: orderArr } }
        )
          .then(() => resolve())
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => console.log(err));
  });
};

///////////////////
//GET SINGLE TABLE
const getTable = (id, tableNumber) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      TABLESCHEMA.findOne({ restaurantId: id, table_number: tableNumber })
        .then((table) => {
          // console.log("GET TABLE:", table);
          if (table === null) {
            resolve("not_exist");
          } else {
            resolve(table);
          }
        })
        .catch((err) => reject(err));
    });
  });
};

const resetTableOrder = (tableId) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      TABLESCHEMA.findByIdAndUpdate({ _id: tableId.trim() }, { orders: [] })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  });
};

const setOrderToKitchen = (restaurantId, tableId, orderArr, tableNumber) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        const newOrder = new KITCHENSCHEMA({
          restaurantId: restaurantId,
          tableId: tableId,
          orders: orderArr,
          tableNumber: tableNumber,
        });
        newOrder
          .save()
          .then(() => resolve())
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
};

/////////////////////////////////
//GET ALL ORDERS FOR THE KITCHEN
const getOrder = (id) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      const promisesArr1 = [];
      promisesArr1.push(KITCHENSCHEMA.find({ restaurantId: id }));
      promisesArr1.push(MENUSCHEMA.find({ restaurantId: id }));
      Promise.all(promisesArr1)
        .then((results) => {
          const ordersArr = results[0];
          const menuArr = results[1];
          let newOrdersArr = [];
          ordersArr.forEach((orderObj) => {
            orderObj.orders.forEach((orderId) => {
              menuArr.forEach((menu) => {
                if (menu._id == orderId) {
                  newOrdersArr.push(menu);
                }
              });
            });
            orderObj.orders = newOrdersArr;
            newOrdersArr = [];
          });
          resolve(ordersArr);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  });
};

/////////////////////////////////
//GET ALL ORDERS FOR THE KITCHEN
const getOrderLogs = (tableId, restaurantId) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      const promisesArr1 = [];
      promisesArr1.push(TABLESCHEMA.findOne({ _id: tableId }));
      promisesArr1.push(MENUSCHEMA.find({ restaurantId: restaurantId }));
      Promise.all(promisesArr1)
        .then((results) => {
          const ordersArr = results[0];
          const menuArr = results[1];
          let newOrdersArr = [];
          ordersArr.orders.forEach((orderId) => {
            menuArr.forEach((menu) => {
              if (menu._id == orderId) {
                newOrdersArr.push(menu);
              }
            });
          });
          resolve(newOrdersArr);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  });
};

module.exports = {
  addTables,
  getAllTables,
  setTableService,
  setTablePayment,
  getTable,
  setTableOrders,
  setOrderToKitchen,
  resetTableOrder,
  getOrder,
  getOrderLogs,
};
