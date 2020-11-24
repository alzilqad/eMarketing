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
  res.clearCookie("id");
  res.clearCookie("company_name");
  res.clearCookie("company_contact");
  res.clearCookie("company_id");
  res.clearCookie("manager_id");
  res.clearCookie("client_id");
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

// proposals

router.get("/:id/proposals", (req, res) => {
  res.cookie("error", "");
  proposalModel.getAll(
    req.cookies["client_id"],
    req.cookies["company_id"],
    function (results) {
      console.log(results);
      res.render("clientUser/company/proposals", {
        proposal: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.cookies["id"],
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
    .check("zip_code", "Invalid Zipcode")
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
    res.redirect("/client/company/" + req.params.id + "/proposals");
  } else {
    proposalModel.insert(proposal, function () {
      res.redirect("/client/company/" + req.params.id + "/proposals");
    });
  }
});

router.post("/:id/proposals/optup/:id2", (req, res) => {
  proposalModel.optUp(req.params.id2, function () {
    res.redirect("/client/company/" + req.params.id + "/proposals");
  });
});

router.post("/:id/proposals/approve/:id2", (req, res) => {
  proposalModel.approve(req.params.id2, function () {
    res.redirect("/client/company/" + req.params.id + "/proposals");
  });
});

// notes

router.get("/:id/notes", (req, res) => {
  res.cookie("error", "");
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
        error: req.cookies["error"],
      });
    }
  );
});

router.post("/:id/notes", (req, res) => {
  req
    .check("title", "Invalid Title")
    .isLength({ min: 5 })
    .withMessage("Title must contain minimum 5 characters");
  req
    .check("body", "Invalid Body")
    .isLength({ min: 5 })
    .withMessage("Body must contain minimum 5 characters");

  let error = req.validationErrors();

  var currentdate = new Date();
  var note = [
    req.body.title,
    req.body.body,
    req.cookies["manager_id"],
    req.cookies["client_id"],
    currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate(),
    req.cookies["uname"],
  ];

  if (error) {
    res.cookie("error", error);
    res.redirect("/client/company/" + req.params.id + "/notes");
  } else {
    noteModel.insert(note, function () {
      res.redirect("/client/company/" + req.params.id + "/notes");
    });
  }
});

router.post("/:id/notes/delete/:id2", (req, res) => {
  noteModel.delete(req.params.id2, function () {
    res.redirect("/client/company/" + req.params.id + "/notes");
  });
});

// appointments

router.get("/:id/appointments", (req, res) => {
  res.cookie("error", "");
  appointmentModel.getAll(
    req.cookies["client_id"],
    req.cookies["manager_id"],
    function (results) {
      // console.log(results);
      res.render("clientUser/company/appointments", {
        appointment: results,
        name: req.cookies["uname"],
        type: req.cookies["type"],
        id: req.cookies["id"],
        company_name: req.cookies["company_name"],
        company_contact: req.cookies["company_contact"],
        error: req.cookies["error"],
      });
    }
  );
});

router.post("/:id/appointments", (req, res) => {
  req
    .check("title", "Invalid Title")
    .isLength({ min: 5 })
    .withMessage("Title must contain minimum 5 characters");
  req
    .check("body", "Invalid Body")
    .isLength({ min: 5 })
    .withMessage("Body must contain minimum 5 characters");

  let error = req.validationErrors();

  var currentdate = new Date();
  var appointment = [
    req.body.title,
    req.body.body,
    req.body.date,
    currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate(),
    req.cookies["manager_id"],
    req.cookies["client_id"],
    req.cookies["uname"],
  ];

  if (error) {
    res.cookie("error", error);
    res.redirect("/client/company/" + req.params.id + "/appointments");
  } else {
    appointmentModel.insert(appointment, function () {
      res.redirect("/client/company/" + req.params.id + "/appointments");
    });
  }
});

router.get("/:id/appointments/edit/:id2", (req, res) => {
  var currentdate = new Date();
  var appointment = [
    req.body.title,
    req.body.body,
    req.body.date,
    currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate(),
  ];

  appointmentModel.update(appointment, req.params.id2, function () {
    res.redirect("/client/company/" + req.params.id + "/appointments");
  });
});

router.post("/:id/appointments/delete/:id2", (req, res) => {
  appointmentModel.delete(req.params.id2, function () {
    res.redirect("/client/company/" + req.params.id + "/appointments");
  });
});

// services

router.get("/:id/services", (req, res) => {
  serviceModel.getAll(req.cookies["company_id"], function (results) {
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

//chat

router.get("/:id/chat", (req, res) => {
  res.render("clientUser/company/chat", {
    name: req.cookies["uname"],
    type: req.cookies["type"],
    id: req.cookies["id"],
    company_name: req.cookies["company_name"],
    company_contact: req.cookies["company_contact"],
  });
});

router.post("/:id/chat", (req, res) => {
  console.log(req.body.userName);
  res.send("");
});

module.exports = router;
