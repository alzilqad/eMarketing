const express = require("express");
const userModel = require.main.require("./models/clientUser/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("clientUser/login/index", {name: req.cookies['uname'], type: req.cookies['type']});
});

router.post("/", (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
  };

  userModel.validate(user, function (status) {
    if (status) {
	  res.cookie("uname", req.body.username);
	  res.cookie("type", "client");
	  // res.cookie("type", type);
      res.redirect("/home");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
