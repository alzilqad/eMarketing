const express = require("express");
const userModel = require.main.require("./models/clientUser/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("clientUser/registration/index", {name: req.cookies['uname'], type: req.cookies['type']});
});

router.post("/", (req, res) => {
  var user = [
    req.body.username,
    req.body.password,
    req.body.full_name,
    req.body.contact_no,
    req.body.email,
    req.body.address,
    req.body.country,
    req.body.gender,
    req.body.dob,
    // req.body.type,
  ];

  userModel.insert(user, function (result) {
    if (result) {
      res.redirect("/login");
    } else {
      res.send("User has not been Created");
    }
  });
});

module.exports = router;
