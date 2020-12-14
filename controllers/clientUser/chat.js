const express = require("express");
const router = express.Router();
const fs = require("fs");
var messages = require.main.require("./messages.json");

router.get("/", (req, res) => {
  res.render("clientUser/chat/index", {
    name: req.cookies["uname"],
    type: req.cookies["type"],
  });
});

router.post("/", (req, res) => {
  var currentdate = new Date();
  var date =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes();
  messages.name[0].messages[messages.name[0].messages.length] = {
    sender: req.cookies["uname"],
    message_text: req.body.text,
    date: date,
  };
  var data = JSON.stringify(messages, null, 2);
  fs.writeFile("messages.json", data, finished);
  function finished(err) {
    console.log(err);
  }
  res.render("clientUser/chat/populate", {
    name: req.cookies["uname"],
    type: req.cookies["type"],
  });
  res.end();
});

module.exports = router;
