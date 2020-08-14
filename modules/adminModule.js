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
        if (img) {
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
          img.mv("./public/upload/" + newImgName);
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
        } else {
          const newMeal = new MENUSCHEMA({
            title: title,
            description: description,
            number: number,
            price: price,
            category: category,
            img: "",
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
        }
      })

      .catch((err) => console.log(err));
  });
}

////////////////
//GET ALL MEALS
function getAllMeals(id) {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        MENUSCHEMA.find({ restaurantId: id })
          .then((meals) => resolve(meals))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
}


//////////////////////////////////////
// GET MEAL
function getMeal(id) {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      MENUSCHEMA.findOne({ _id: id }).then(meal => {
        if (meal) {
          console.log(meal);
          resolve(meal)
        } else {
          reject(new Error('can not find meal with this id : ' + id))
        }
      }).catch(error => {

        reject(error)
      })

    }).catch(error => {
      reject(error)
    })
  })
}






function updateMeal(
  id,
  newMealTitle,
  mealDedcription,
  newMealNumber,
  newPrice,
  newImg,
  newMealCategory
) {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        MENUSCHEMA.findOneAndUpdate(
          { _id: id },
          {

            title: newMealTitle,
            description: mealDedcription,
            number: newMealNumber,
            price: newPrice,
            category: newMealCategory
          }
        )
          .then((result) => {
            if(newImg){
              newImg.mv('./public' + result.img)
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}



























//editmeal
// delet meal

module.exports = { addMeal, getAllMeals, updateMeal, getMeal };
