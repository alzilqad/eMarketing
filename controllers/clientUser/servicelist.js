const express = require("express");
const servicelistModel = require.main.require(
  "./models/clientUser/servicelistModel"
);
const router = express.Router();

router.get("/", (req, res) => {
  servicelistModel.getAll(req.cookies["uname"], function (results) {
    console.log(results);
    res.render("clientUser/servicelist/index", {
      services: results,
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

module.exports = router;
