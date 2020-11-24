const express = require("express");
const userModel = require.main.require("./models/clientUser/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("error","");
  if (req.cookies["uname"] == null) {
    res.redirect("/login");
  } else {
    res.render("clientUser/dashboard/index", {
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  }
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

router.post("/profile", (req, res) => {
  if (req.files) {
    // console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    // console.log(filename);
    file.mv("../.././assets/img/team/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/client/profile");
      }
    });
  }
});

router.get("/profile/edit/", (req, res) => {
  res.cookie("error", "");
  userModel.getByUsername(req.cookies["uname"], function (results) {
    results[0].dob = new Date(results[0].dob).toISOString().slice(0, 10);
    res.render("clientUser/profile/edit", {
      user: results[0],
      name: req.cookies["uname"],
      type: req.cookies["type"],
      error: req.cookies["error"],
    });
  });
});

router.post("/profile/edit/", (req, res) => {
  req
    .check("password", "Invalid Password")
    .isLength({ min: 5 })
    .withMessage("Password must contain minimum 5 characters");
  req.check("email", "invalid Email").isEmail();
  req
    .check("contact_no")
    .isInt()
    .withMessage("Contact Number must be only numeric")
    .isLength({ min: 11 })
    .withMessage("Contact Number must contain at least 11 characters");
  req
    .check("address", "Invalid Address")
    .isLength({ min: 5 })
    .withMessage("Address must contain minimum 5 characters");
  req
    .check("country", "Invalid Country")
    .isLength({ min: 5 })
    .withMessage("Country must contain minimum 5 characters");
  req
    .check("gender", "Invalid Gender")
    .not()
    .isInt()
    .withMessage("Gender must contain only characters")
    .isIn(["Male", "Female", "male", "female"]);
  var error = req.validationErrors();

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

  if (error) {
    res.cookie("error", error);
    res.redirect("/client/profile/edit/");
  } else {
    userModel.getByUsername(req.cookies["uname"], function (results) {
      if (user[0] == results[0].password) {
        userModel.update(results[0].client_id, user, function (result) {
          if (result) {
            res.redirect("/client/profile/");
          } else {
            results[0].dob = new Date(results[0].dob)
              .toISOString()
              .slice(0, 10);

            res.render("clientUser/profile/edit", {
              user: results[0],
              name: req.cookies["uname"],
              type: req.cookies["type"],
              error: [{ msg: "The information is failed to updated" }],
            });
          }
        });
      } else {
        results[0].dob = new Date(results[0].dob).toISOString().slice(0, 10);

        res.render("clientUser/profile/edit", {
          user: results[0],
          name: req.cookies["uname"],
          type: req.cookies["type"],
          error: [{ msg: "Incorrect Password" }],
        });
      }
    });
  }
});

module.exports = router;
