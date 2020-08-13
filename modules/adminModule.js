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


function updateMeal(restaurantId, newMealTitle, oldImg, mealDedcription, newMealNumber, newPrice, newImg, userid) {
  return new Promise((resolve, reject) => {
      try {


          (async () => {

              //! first get old meal 
              let oldMealData = await connect().then(()=>{
                MENUSCHEMA.find({restaurantId:restaurantId})
              }).then((meal)=>{
                if (!meal.img) {
                  
                }
              })
              const deletedImgs = []
              let keepImgs = []

              oldMealData.img.forEach(img => {
                  if (oldImg.indexOf(img) == -1) {
                      deletedImgs.push(img)  // we need to delet them from the fills too in line 255
                  } else {
                      keepImgs.push(img)
                  }
              });
              // save new images to file system and then arry to be save to db
              const newImgsUrlsArr = []
              newImg.forEach((img, idx) => {
                  const imgExt = img.name.substr(img.name.lastIndexOf('.'))
                  // set new img name without space  /uploadedFiles/my_book_5464_0.jpg
                  const newImgName = newMealTitle.trim().replace(/ /g, '_') + '_' + userid + '_' + idx + '_' + (oldBookData.__v + 1) + imgExt
                  newImgsUrlsArr.push('/uploadedFiles/' + newImgName)
                  img.mv('./public/uploadedFiles/' + newImgName)  //renaming/moving a  file and update all
              })

              //delet the old deletedImg from db
              deletedImgs.forEach(file => {
                  if (fs.existsSync('./public' + file)) {  // check if this file exist
                      fs.unlinkSync('./public' + file)   //! delet the old imgs in line 227
                  }

              })

              const result = await Books.updateOne({ _id: bookid }, {
                  title: newMealTitle,
                  description: mealDedcription,
                  //pdfUrl >> we replace it in line 262 
                  imgs: [...keepImgs, ...newImgsUrlsArr],
                  $inc: { __v: 1 }
              })
              resolve()
          })()
      } catch (error) {
          reject(error)
      }
  })

}


//editmeal
// delet meal

module.exports = { addMeal, getAllMeals , updateMeal};
