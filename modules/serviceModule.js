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

const setTableOrders = (tableId, orderArr) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        TABLESCHEMA.findByIdAndUpdate(
          { _id: tableId.trim() },
          { orders: orderArr }
        )
          .then(() => resolve())
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => console.log(err));
  });
};

const getTable = (id, tableNumber) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      TABLESCHEMA.findOne({ restaurantId: id, table_number: tableNumber })
        .then((table) => resolve(table))
        .catch((err) => error);
    });
  });
};

const resetTableOrder = (tableId) => {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      TABLESCHEMA.findByIdAndUpdate({ _id: tableId.trim() }, { orders: [] })
        .then(() => resolve())
        .catch((err) => err);
    });
  });
};

const setOrderToKitchen = (restaurantId, tableId, orderArr) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        const newOrder = new KITCHENSCHEMA({
          restaurantId: restaurantId,
          tableId: tableId,
          orders: orderArr,
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
      // KITCHENSCHEMA.find({ restaurantId: id })
      //   .then((ordersArr) => {

      //     ordersArr.forEach((orderObj) => {
      //       const promisesArr = [];
      //       orderObj.orders.forEach((orderId) => {
      //         promisesArr.push(MENUSCHEMA.findById({ _id: orderId }));
      //       });
      //       Promise.all(promisesArr)
      //         .then((newOrders) => {
      //           // console.log(newOrders);
      //           orderObj.orders = newOrders;
      //           // console.log(ordersArr);
      //           //resolve(ordersArr);
      //         })
      //         .catch((errs) => {
      //           reject(errs);
      //         });
      //     });
      //   })
      //   .catch((err) => reject(err));
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
                if (menu._id === orderId) {
                  newOrdersArr.push(menu);
                }
              });
            });
            orderObj.orders = newOrdersArr;
            newOrdersArr = [];
          });
          console.log("ORDER ARRAY", ordersArr);
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
};
