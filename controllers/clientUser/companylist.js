const express = require("express");
const companylistModel = require.main.require(
  "./models/clientUser/companylistModel"
);
const serviceModel = require.main.require("./models/clientUser/serviceModel");
const proposalModel = require.main.require("./models/clientUser/proposalModel");

const router = express.Router();

router.get("/", (req, res) => {
  companylistModel.getAll(function (results) {
    // console.log(results);
    res.render("clientUser/companylist/index", {
      companies: results,
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.get("/:id", (req, res) => {
  companylistModel.getById(req.params.id, function (results) {
    res.cookie("company_name", results[0].company_name);
    res.cookie("company_contact", results[0].contact_number);
    res.cookie("manager_id", results[0].manager_id);

    console.log(results[0]);

    res.render("clientUser/companylist/lifecycle", {
      company: results[0],
      name: req.cookies["uname"],
      type: req.cookies["type"],
      id: req.params.id,
      company_name: req.cookies["company_name"],
      company_contact: req.cookies["company_contact"],
    });
  });
});

router.get("/:id/services", (req, res) => {
  serviceModel.getAll(req.params.id, function (results) {
    console.log(results);
    res.render("clientUser/companylist/services", {
      service: results,
      name: req.cookies["uname"],
      type: req.cookies["type"],
      id: req.params.id,
      company_name: req.cookies["company_name"],
      company_contact: req.cookies["company_contact"],
    });
  });
});

router.get("/:id/proposals", (req, res) => {
  proposalModel.getAll(
    req.cookies["client_id"],
    req.cookies["company_id"],
    function (results) {
      console.log(results);
      res.render("clientUser/companylist/proposals", {
        proposal: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.cookies["id"],
        company_name: req.cookies["company_name"],
        company_contact: req.cookies["company_contact"],
      });
    }
  );
});

module.exports = router;
