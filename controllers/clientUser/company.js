const express = require("express");
const companyModel = require.main.require("./models/clientUser/companyModel");
const router = express.Router();

router.get("/", (req, res) => {
  companyModel.getAll(req.cookies["uname"], function (results) {
    res.render("clientUser/company/index", {
      companies: results,
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.get("/:id", (req, res) => {
  companyModel.getById(req.cookies["uname"], req.params.id, function (
    results
  ) {
    console.log(results[0]);
    res.render("clientUser/company/lifecycle", {
      company: results[0],
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.get("/:id/proposals", (req, res) => {
    companyModel.getById(req.cookies["uname"], req.params.id, function (
      results
    ) {
      console.log(results[0]);
      res.render("clientUser/company/proposals", {
        company: results[0],
        name: req.cookies["uname"],
        type: req.cookies["type"],
      });
    });
  });

module.exports = router;
