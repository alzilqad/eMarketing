const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  
  res.clearCookie("uname");
  // res.clearCookie("password");
  res.cookie("type", "");
  res.redirect("/login");
});

module.exports = router;
