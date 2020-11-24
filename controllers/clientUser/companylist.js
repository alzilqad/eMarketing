const express = require("express");
const companylistModel = require.main.require(
  "./models/clientUser/companylistModel"
);
const serviceModel = require.main.require("./models/clientUser/serviceModel");
const proposalModel = require.main.require("./models/clientUser/proposalModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("company_name");
  res.clearCookie("company_contact");
  res.clearCookie("manager_id");
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

    // console.log(results[0]);

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
    // console.log(results);
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
  res.cookie("error", "");
  proposalModel.getAll(
    req.cookies["client_id"],
    req.params.id,
    function (results) {
      // console.log(results);
      res.render("clientUser/companylist/proposals", {
        proposal: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.params.id,
        company_name: req.cookies["company_name"],
        company_contact: req.cookies["company_contact"],
        error: req.cookies["error"],
      });
    }
  );
});

router.post("/:id/proposals", (req, res) => {
  req
    .check("title", "Invalid Title")
    .isLength({ min: 5 })
    .withMessage("Title must contain minimum 5 characters");
  req
    .check("body", "Invalid Body")
    .isLength({ min: 5 })
    .withMessage("Body must contain minimum 5 characters");
  req
    .check("subject", "Invalid Subject")
    .isLength({ min: 5 })
    .withMessage("Subject must contain minimum 5 characters");
  req
    .check("address", "Invalid Address")
    .isLength({ min: 5 })
    .withMessage("Address must contain minimum 5 characters");
  req
    .check("city", "Invalid City")
    .isLength({ min: 5 })
    .withMessage("City must contain minimum 5 characters");
  req
    .check("state", "Invalid State")
    .isLength({ min: 5 })
    .withMessage("State must contain minimum 5 characters");
  req
    .check("country", "Invalid Country")
    .isLength({ min: 5 })
    .withMessage("Country must contain minimum 5 characters");
  req
    .check("zipcode", "Invalid Zipcode")
    .isInt()
    .withMessage("Zipcode Number must be only numeric")
    .isLength({ min: 4 })
    .withMessage("Zipcode number must contain at least 4 characters");
  req.check("email", "invalid Email").isEmail();
  req
    .check("phone")
    .isInt()
    .withMessage("Contact Number must be only numeric")
    .isLength({ min: 11 })
    .withMessage("Contact Number must contain at least 11 characters");
  req
    .check("item", "Invalid Item")
    .isLength({ min: 5 })
    .withMessage("Item must contain minimum 5 characters");
  let error = req.validationErrors();
  
  var proposal = [
    req.body.title,
    req.body.subject,
    req.body.body,
    req.body.customer_name,
    req.body.starting_date,
    req.body.deadline_date,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.country,
    req.body.zip_code,
    req.body.email,
    req.body.phone,
    req.body.item,
    req.body.quantity,
    req.body.rate,
    req.cookies["client_id"],
    req.cookies["manager_id"],
    req.cookies["company_id"],
    req.cookies["uname"],
  ];

  if (error) {
    res.cookie("error", error);
    res.redirect("/companylist/" + req.params.id + "/proposals");
  } else {
    proposalModel.insert(proposal, function () {
      res.redirect("/companylist/" + req.params.id + "/proposals");
    });
  }
});

router.post("/:id/proposals/optup/:id2", (req, res) => {
  proposalModel.optUp(req.params.id2, function () {
    res.redirect("/companylist/" + req.params.id + "/proposals");
  });
});

router.post("/:id/proposals/approve/:id2", (req, res) => {
  proposalModel.approve(req.params.id2, function () {
    res.redirect("/companylist/" + req.params.id + "/proposals");
  });
});

module.exports = router;
