const express = require("express");
const userModel = require.main.require("./models/clientUser/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("error", "");
  res.render("clientUser/registration/index", {
    name: req.cookies["uname"],
    type: req.cookies["type"],
    error: req.cookies["error"],
  });
});

router.post("/", (req, res) => {
  req
    .check("username", "Invalid Username")
    .isLength({ min: 5 })
    .withMessage("Username must contain minimum 5 characters");
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

  if (error) {
    res.cookie("error", error);
    res.redirect("registration");
  } else {
    userModel.insert(user, function (result) {
      if (result) {
        res.redirect("/login");
      } else {
        res.render("clientUser/registration/index", {
          name: req.cookies["uname"],
          type: req.cookies["type"],
          error: [{ msg: "Invalid input" }],
        });
      }
    });
  }
});

module.exports = router;
