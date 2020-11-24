const express = require("express");
const proposallistModel = require.main.require(
  "./models/clientUser/proposallistModel"
);

const router = express.Router();

router.get("/", (req, res) => {
  proposallistModel.getAll(req.cookies["uname"], function (results) {
    console.log(results);
    res.render("clientUser/proposallist/index", {
      proposal: results,
      name: req.cookies["uname"],
      type: req.cookies["type"],
    });
  });
});

router.post("/optup/:id", (req, res) => {
  proposallistModel.optUp(req.params.id, function () {
    res.redirect("/proposallist");
  });
});

router.post("/approve/:id", (req, res) => {
  proposallistModel.approve(req.params.id, function () {
    res.redirect("/proposallist");
  });
});

module.exports = router;
