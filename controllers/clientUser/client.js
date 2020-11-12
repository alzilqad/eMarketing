const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("manager/home/index");
});

router.get("/profile", (req, res) => {
  res.render("clientUser/profile/index");
});

router.get("/profile/edit/:id", (req, res) => {
  res.render("clientUser/profile/edit");
});

module.exports = router;
