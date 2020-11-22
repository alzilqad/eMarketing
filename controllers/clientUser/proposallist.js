const express = require("express");
const proposallistModel = require.main.require("./models/clientUser/proposallistModel");

const router = express.Router();

router.get("/", (req, res) => {
    proposallistModel.getAll(
      req.cookies["uname"],
      function (results) {
        console.log(results);
        res.render("clientUser/proposallist/index", {
          proposal: results,
          name: req.cookies["uname"],
          type: req.cookies["type"],
        });
      }
    );
  });
  

module.exports = router;
