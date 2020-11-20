const express = require("express");
const userModel = require.main.require("./models/clientUser/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("clientUser/home/index", {
    name: req.cookies["uname"],
    type: req.cookies["type"],
  });
});

router.get("/profile", (req, res) => {
  userModel.getByUsername(req.cookies["uname"], function (results) {
    res.render("clientUser/profile/index", {
      user: results[0],
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.get("/profile/edit/", (req, res) => {
  userModel.getByUsername(req.cookies["uname"], function (results) {
    res.render("clientUser/profile/edit", {
      user: results[0],
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.post("/profile/edit/", (req, res) => {
  
});

module.exports = router;
