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
  
  var user = [
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

  userModel.getByUsername(req.cookies["uname"], function (results) {
    if (user[0] == results[0].password) {
      userModel.update(results[0].client_id, user, function (result) {
        if (result) {
          res.redirect("/client/profile/");
        } else {
          res.render("clientUser/profile/edit", {
            user: results[0],
            name: req.cookies["uname"],
            type: req.cookies["type"],
            error_message: "The information is failed to updated",
          });
        }
      });
    } else {
      res.render("clientUser/profile/edit", {
        user: results[0],
        name: req.cookies["uname"],
        type: req.cookies["type"],
        error_message: "Incorrect Password",
      });
    }
  });
});

module.exports = router;
