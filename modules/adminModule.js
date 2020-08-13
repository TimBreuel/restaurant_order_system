const connect = require("../models/connectionFn");
const MENUSCHEMA = require("../models/menuSchema");
const fs = require("fs");

function addMeal(
  title,
  description,
  number,
  price,
  category,
  img,
  restaurantId
) {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        let date = Date.now();
        let imgEnd = img.name.substr(img.name.lastIndexOf("."));
        let newImgName =
          title.trim().replace(/ /g, "_") +
          "_" +
          restaurantId +
          "_" +
          date +
          "_" +
          imgEnd;
        let newImgNameDb = "/upload/" + newImgName;
        img.mv("./public/uploads/" + newImgName);
        const newMeal = new MENUSCHEMA({
          title: title,
          description: description,
          number: number,
          price: price,
          category: category,
          img: newImgNameDb,
          restaurantId: restaurantId,
        });
        newMeal
          .save()
          .then(() => {
            resolve(1);
          })
          .catch(() => {
            reject(new Error("can not add meal!"));
          });
      })
      .catch((err) => console.log(err));
  });
}



// getall meal function







// get meal 
//editmeal
// delet meal






module.exports = { addMeal };
