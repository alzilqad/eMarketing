const express = require("express");
const companyModel = require.main.require("./models/clientUser/companyModel");
const proposalModel = require.main.require("./models/clientUser/proposalModel");
const noteModel = require.main.require("./models/clientUser/noteModel");
const appointmentModel = require.main.require(
  "./models/clientUser/appointmentModel"
);
const serviceModel = require.main.require("./models/clientUser/serviceModel");
const router = express.Router();

router.get("/", (req, res) => {
  companyModel.getAll(req.cookies["uname"], function (results) {
    // console.log(results);
    res.render("clientUser/company/index", {
      companies: results,
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.get("/:id", (req, res) => {
  companyModel.getById(req.cookies["uname"], req.params.id, function (results) {
    res.cookie("id", results[0].affiliated_company_id);
    res.cookie("company_name", results[0].company_name);
    res.cookie("company_contact", results[0].contact_number);
    res.cookie("company_id", results[0].company_id);
    res.cookie("manager_id", results[0].manager_id);
    res.cookie("client_id", results[0].client_id);

    // console.log(results[0]);

    res.render("clientUser/company/lifecycle", {
      company: results[0],
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.get("/:id/proposals", (req, res) => {
  proposalModel.getAll(
    req.cookies["client_id"],
    req.cookies["company_id"],
    function (results) {
    //   console.log(results);
      res.render("clientUser/company/proposals", {
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

router.get("/:id/notes", (req, res) => {
  noteModel.getAll(
    req.cookies["client_id"],
    req.cookies["manager_id"],
    function (results) {
      console.log(results);
      res.render("clientUser/company/notes", {
        note: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.cookies["id"],
        company_name: req.cookies["company_name"],
        company_contact: req.cookies["company_contact"],
      });
    }
  );
});

router.get("/:id/appointments", (req, res) => {
  appointmentModel.getAll(
    req.cookies["client_id"],
    req.cookies["manager_id"],
    function (results) {
    //   console.log(results);
      res.render("clientUser/company/appointments", {
        appointment: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.cookies["id"],
        company_name: req.cookies["company_name"],
        company_contact: req.cookies["company_contact"],
      });
    }
  );
});

router.get("/:id/services", (req, res) => {
  serviceModel.getAll(req.cookies["company_id"], function (
      results
    ) {
      console.log(results);
      res.render("clientUser/company/services", {
        service: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.cookies["id"],
        company_name: req.cookies["company_name"],
        company_contact: req.cookies["company_contact"],
      });
    });
});

module.exports = router;
