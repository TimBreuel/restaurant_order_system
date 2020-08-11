const express = require("express");
const adminRoute = express.Router();

adminRoute.get("/", (req, res) => {
  res.send("Admin Routes");
});

module.exports = adminRoute;
