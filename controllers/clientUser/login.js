const express = require("express");
const userModel = require.main.require("./models/clientUser/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  if(req.cookies['uname']!=""){
    res.redirect("/client");
  } else{
    res.cookie("error","");
    res.render("clientUser/login/index", {name: req.cookies['uname'], type: req.cookies['type'], error: req.cookies['error']});
  }
});

router.post("/", (req, res) => {
  req.check('username',"Invalid Username").isLength({min:5}).withMessage("Username must contain minimum 5 characters");
  req.check('password',"Invalid Password").isLength({min:5}).withMessage("Password must contain minimum 5 characters");
  
  let error = req.validationErrors();
  var user = {
    username: req.body.username,
    password: req.body.password,
  };

  if(error){
    res.cookie("error",error);
    res.redirect("/login");
  } else{
    userModel.validate(user, function (status) {
      if (status) {
      res.cookie("uname", req.body.username);
      res.cookie("type", "client");
      res.clearCookie("error");
      // res.cookie("type", type);
        res.redirect("/client");
      } else {
        res.render("clientUser/login/index", {name: req.cookies['uname'], type: req.cookies['type'], error: [{msg: "Invalid Username or Password"}]});
      }
    });
  }
});

module.exports = router;
