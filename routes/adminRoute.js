const express = require("express");
const adminRoute = express.Router();

adminRoute.get("/", (req, res) => {
  res.send("Admin Routes");
});


//----------admin--- addMael 
adminRoute.get('addMeal' , (req , res)=>{
  res.send('addmeal');
})

adminRoute.post('addMeal' , (req , res)=>{
  res.send('addmeal');
})



//----------admin--- editMael 

adminRoute.post('editMeal' , (req , res)=>{
  res.send('editMeal');
})





//----------admin--- deleteMael 

adminRoute.post('deleteMeal' , (req , res)=>{
  res.send('deletMail');
})






module.exports = adminRoute;
